var  statusPending=0;
var  statusProcess=1;
var  statusCompleted=2;
var  statusAll=3;

var  isEmpty=-1;
var  isNotEmpty=-2;
  
var  notifyEndless=true;

var  messageRead=0;
var  messageUnread=1;

var ticket;
var prevNotificationCnt=null;
var notificationCnt;

var  dataStatus={type:'status',status:3};
async function getData(param) 
{
  try
  {
    const response=await axios.post('/tickets',{params:param});

    stopLoading();
    if(response.data.status=='DBError')
        alert('Database error');
    else if(response.data.status=='OK')
    {
      
      const  ticketsCnt=response.data.data.length;
      if(ticketsCnt== 0)
      {
        if(isUserAdmin())
        {
          hideSelectAll();
          hideRemoveAll();
        }
        createTicketsMessageEmpty();
      }
      else
      {     
        if(isUserAdmin())
        {
          showSelectAll();
          showRemoveAll()
          blockRemoveAll();
        }
        for(i=0;i<ticketsCnt;i++)
          createTicketContainer(response.data.data[i]);
      }   
    }
            
    else
    {
        alert(`Data status  ${response.data.status}`);
        console.log(`Data get status error ${response.data.status}`);
    }
    
  }
  catch(err)
  {
    alert(`Error with internet ${err}`);
    console.log(`Error with internet ${err}`);
  }
}

///////
async function getUpload(ticketId) 
{
  try
  {
    const response=await axios.post('/getUpload',{'ticketId':ticketId});
    if(response.data.status=='OK')
    {
      const uploadPath=response.data.result.Path;
      console.log('Data uploaded successfully');
      return uploadPath;
    }
    else
    {
      console.log('Data uploading error');
      return false;
    }
}
  catch(err)
  {
    console.log(`Error uploading file ${err}`);
    return false;
  }

}
///////

function defineTicketStatus(Status)
{
  let status;
  switch (parseInt(Status))
  {      
  case statusPending:
      status=statusPending;
      break
  case statusProcess:
      status=statusProcess;
      break;
  case statusCompleted:
      status=statusCompleted;
      break;
      //Later solve 
  default:
      status=statusPending;
  }
  return status;
}

async function checkNotification() 
{
  try
  {
    const response= await axios.get('/checkNotify');  
    if(response.data.status=='OK')
    {
        const notificationCnt=response.data.message.Cnt;
        if(notificationCnt > 0)
        {
          if(titlePromiseStatus==null)
            titlePromiseStatus=blinkTitle();
          
          notificationCnt>90?showNotificationCnt(notificationCnt,notifyEndless):showNotificationCnt(notificationCnt);
          if((prevNotificationCnt !=  notificationCnt))
          {
            if(prevNotificationCnt < notificationCnt)
            {
              playNotificationSound();
              ///
              shakeBell();
              let curActiveBtn=checkActiveBtn();
              updateTickets({type:'status',status:curActiveBtn});
              ///
            } 
            
          if(checkStatistic())
            updateStatistic();
          }
          
          prevNotificationCnt=notificationCnt;
      }
      else
      {
        hideNotificationCnt();
        unblinkTitle();
      }
    }
      
  }
  catch(err)
  {
    console.error('notification error',err);
  }
}
async function delNotification(id) 
{
  try
  {
    const response=await axios.post('/delNotify',{'params':id});
    
    if(response.data.status=='OK')
    {
      showNotifications();
      console.log(`Notification removed successfully`);
    }
    else
    {
      alert('Notification removing error');
    }
    
  }
  catch(err)
  {
    console.error(`Notification removing  error ${err}`);
  }
}  

function fillingTicket(data)
{ 
  const phone=document.getElementById('phone');
  const name=document.getElementById('FIO');
  const email=document.getElementById('email');
  const status=document.getElementById('status');
  const description =document.getElementById('description');
  const problem=document.getElementById('problem');
  
  const date=document.getElementById('date');
  
  name.innerText= data.FIO;
  phone.innerText = data.Number;
  email.innerText = data.Email;
  problem.innerText=defineProblemStatus(data.Problem);
  
  data.Date==null?date.innerText='':date.innerText=convertDate(data.Date);;

  description.innerText='';
  ////////
  if(data.Problem=='create-e-signature')
  { 
      getUpload(data.Id).then((result)=>
      {
        const uploadLink=createUploadLink(result);
        description.appendChild(uploadLink);

      }).catch((err)=>
      {
        const uploadError=createUploadError();
        description.appendChild(uploadError);
        console.log(err);
      })
      
  }
  else
    description.innerText = data.Description;
  ////////
  description.innerText = data.Description;

  if(data.Status == statusProcess)
    status.textContent='IN PROCESS';
  else if(data.Status == statusPending)
    status.textContent='PENDING';
  else
    status.textContent='COMPLETED';
}

function closeTicketsWindow()
{
  let ticketWindow=getTicketWindow();
  ticketWindow.close();
}
function openTicketsWindow()
{
  let ticketWindow=getTicketWindow();
  ticketWindow.showModal();
}



function searchData(data)
{
  
  let searchData=data.value;
  cleanTickets();
  startLoading();
  axios.get('/searchTickets',
    {
      params:{
      params:searchData
    }
    }).then(response=>{
    stopLoading();
    if(response.data.status=='SrchError')
    {
      alert(response.data.message);
    }
    else if(response.data.status=='OK')
    {
      if(response.data.message.length ==0)
      {
        if(isUserAdmin)
        {
          if(isUserAdmin())
          {
            hideRemoveAll();
            hideSelectAll();
          }
          createTicketsMessageEmpty('Nothing found');
        }
      }
      else
      {
        for(i=0;i<response.data.message.length;i++)
          createTicketContainer(response.data.message[i]);
      }
    }
    else
      alert('Unknown error');

    
  }).catch(err=>{
    //unblockTickets();

    alert('Error with internet');
    console.log(err);
    
  });
  

}
function cleanTickets()
{
  const ticketsContainer=getTicketsContainer();
  ticketsContainer.replaceChildren();
}

function updateTickets(params)
{
  setActiveBtn(params.status);
  setActiveBtnColor();
  cleanTickets();
  ///
  startLoading();
  ///
  getData(params);
  
}

async function readNotification(data) 
{
  try
  {
    const notifications=  await axios.post('/readNotify',{params:data});
    
    if(notifications.data.status=='OK')
    {
        updateTickets(dataStatus);
        (notificationCnt-1)>0?showNotificationCnt(notificationCnt-1):hideNotificationCnt();
    }
    else
    {
      alert('Error read notification');
      console.error(notifications.data.status);
    }
  }
  catch(err)
  {
    alert('Error reading notifications');
    console.error(err);
  }

}

function connectTicket(data)
{
  const preparedData=data.replace(/(\r\n|\r|\n)/g, "\\n");
  const dataResult=JSON.parse(preparedData);
  
  openTicketsWindow();
  fillingTicket(dataResult);
  
  if(dataResult.notify_status)
    readNotification(dataResult.Id);
    
}
function connectLabelModerator(event,data)
{
  const preparedData=data.replace(/(\r\n|\r|\n)/g, "\\n");
  const dataResult=JSON.parse(preparedData);
  
  dataResult.Status=event.value;
  updateTicketStatus(dataResult);
}




/**Get problem description from text */
/**Arg text of problem */
function defineProblemStatus(problemStatus)
{
//TO JSON FILE 
let retProblem;
if(problemStatus=="not-access-folder")
  retProblem="Problems accessing folder";
else if(problemStatus=="not-access-network")
  retProblem="network problems";
else if(problemStatus=="create-a-pass")
  retProblem="Monitor problem";
else if(problemStatus=="create-e-signature")
  retProblem="Keyboard problem";
else if(problemStatus=="not-access-cartridge")
  retProblem="Replace cartridge";
else if(problemStatus=="not-access-programm")
  retProblem="Problems with programms";
else if(problemStatus=="not-access-printer")
  retProblem="Problems with printer";
else if(problemStatus=="not-access-phone")
  retProblem="Problems with phone";
else
  retProblem="Other";

  return retProblem;
  
}

function playNotificationSound()
{
  const  sound=document.getElementById('notify-sound');
  sound.play();
}

async function getStatistic() 
{
  try
  {
    const response=await axios.get('/stat');
    const statistic=response.data.result;

    showStatPending(statistic.Pending);
    showStatProcess(statistic.Process);
    showStatCompleted(statistic.Completed);
  }
  catch(err)
  {
      console.error('Statistic error',err);
      alert(err)
  }
}

function updateStatistic()
{
  getStatistic(); 
}
async function getProblemsStatistic()
{
  try
  {
    const response= await axios.get('/statProblem',{params:{problem:problem}});
    if(response.data.status=='OK')
    {
      const result=response.data.result;
      
      showStatCartidges(result.Cart);
      showStatSign(result.Sign);
      showStatPass(result.Pass);
      
    }
    else
      alert(response.data.result);
  }
  catch(err)
  {
    console.error('Problem statisctis error ',err);
    alert(err);
  }
}
function scrollToTicket(ticketId)
{
  closeNotifyWindow();
}

function updateTicketStatus(data)
{    
  let isSendMail=false;
  var  mailData={};

  if(data.Status==statusCompleted)
  {
    isSendMail=true;
    
    mailData={
      email:data.Email,
      problem:data.Problem};
  }
 
  
  axios.post('/updateStatus',{'params':{'statusTo':data.Status,'id':data.Id,'sendMail':isSendMail,'mailData':mailData}}).then(result=>
  {
    if(result.data.status=='OK')
    {
      updateTickets(statusAll);
      //
      if(checkUserAuth())
      {
        updateStatistic();
        updateProblemStatistic();
      }
      //
    }

  }).catch(err=>
    {
    alert('Error updating status');
    console.log(err);
  });      
}



function convertDate(date)
{
  let dateResult=new Date(date);
  
  let year=dateResult.getFullYear();
  let month=dateResult.toLocaleString('default',{month:'long'});
  let day=dateResult.getDate();
  let hours=dateResult.getHours();
  let minutes=dateResult.getMinutes() < 10 ? '0'+dateResult.getMinutes():dateResult.getMinutes();
  let seconds=dateResult.getSeconds();
  
 return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`; 
}  

function deleteTickets()
{
  let isToDelete=confirm('Do you really want to delete these tickets?');

  const removeTimeout=1000;
  var time=1000;

  if(isToDelete)
  {
      let ticketIds = getCheckedTickets();
      let ticketsContainer = getTicketsContainer();
      let ticketsCount = ticketsContainer.length;
      if(ticketIds.length == ticketsCount)
        alert();
      ///
      startLoading();
      cleanTickets();
      hideNotificationCnt();
      
      hideSelectAll();
      hideRemoveAll();
      ///
      for(a=0;a<ticketIds.length;a++)
      {
        let curLabel=ticketIds[a];
        let result = setTimeout(removeTicket,time,curLabel);
        if(!result)
        {
          alert('Error removing ticket');
          console.log('Error removing ticket');
        }
            
        time=time+removeTimeout;

      }
      
  }
  time=time+removeTimeout;
  setTimeout(updateTickets,time,dataStatus);
  setTimeout(updateStatistic,(time+removeTimeout));
}
function getCurTicketId(labelId)
{
  let curId=labelId.replace('#','');
  return curId;
}

async function removeTicket(ticketId)
{
  try
  {
    let data={'id':ticketId};
    const response= await axios.post('/removeTicket',{data});
    
    if(response.data.status=='OK')
      return true;
    else
      return false;
  }
  catch(err)
  {
    console.log(`Error remove ticket ${err}`);
    alert(`Error remove ticket ${err}`); 
  }
}


function shakeBellRight(bell)
{
  bell.style.transform='rotate(10deg)';
}
function shakeBellLeft(bell)
{
  bell.style.transform='rotate(-10deg)';
}
function shakeBellStraight(bell)
{
  bell.style.transform='rotate(0deg)';
}
function shakeBell()
{
  let bell=document.getElementsByClassName('notify-icon')[0];
  setTimeout(()=>{shakeBellLeft(bell);},50);
  setTimeout(()=>{shakeBellRight(bell);},100);
  setTimeout(()=>{shakeBellLeft(bell);},150);
  setTimeout(()=>{shakeBellRight(bell);},200);
  setTimeout(()=>{shakeBellStraight(bell);},250);
}

async function getVersion()
{
  try
  {
    const  result =await  axios.get('/version');
    const currentVersion = result.data.currentVersion;
    return currentVersion;
  }
  catch(err)
  {
    console.log(`Error getting version ${err}`);   
  }
}
function createVersion()
{
  let versionContainer = document.getElementById('version-container-id');
  getVersion().then((currentVersion)=>{
    versionContainer.innerText='ver.'+currentVersion;  
  }).catch(()=>{
    versionContainer.innerText='Current version';
  });
  
}
    

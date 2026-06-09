function closeNotifyWindow(event)
{
  let notifyWindow=getNotifyWindow();
  notifyWindow.style.display='none'; 
}

function openNotifyWindow()
{
  let notifyWindow=getNotifyWindow();
  notifyWindow.style.display='block';
}
async function showNotifications()
{
  removeNotifyMessage();
  try
  {
    const response=await axios.get('/getNotify');
    if(response.data.status=='ReadAllNotifyError')
      alert('Error reading notifications');
    else if(response.data.status == 'OK')
    {
      const notifyMessageCnt=response.data.message.length;
      if(notifyMessageCnt==0)
        createNotifyMessageEmpty();
      else
      {
        for(i=0;i<notifyMessageCnt;i++)
          createNotifyMessage(response.data.message[i]);
        
      }
      openNotifyWindow();
    }
    else
    {
      alert('Error loading notifications');
    }
    
  }
  catch(err)
  { 
    alert('Error loading notifications');
    console.log(err);
  }
} 
function createNotifyMessageEmpty()
{
    var notifyLabel=document.createElement('div');
    notifyLabel.className='notify-message-empty';
    notifyLabel.innerText='No notifications';

    let notifyWindow=getNotifyWindow();
    notifyWindow.appendChild(notifyLabel);
}
  
function createNotifyMessage(notifyData)
{

    const notifyLabel=document.createElement('div');
    const notifyDelBtn=document.createElement('div');

    const notifyMessage=defineProblemStatus(notifyData.notify_message);
    const ticketId=`ticket_${notifyData.TicketsId}`;
    if(notifyData.notify_status==messageRead)
      notifyLabel.className='notify-message notify-message-read';
    else
      notifyLabel.className='notify-message notify-message-unread';
    notifyLabel.id=notifyData.Id;
    notifyLabel.innerText=`New notification  ${notifyMessage}`; 
    notifyLabel.onclick=()=>{scrollToTicket(ticketId);}

    notifyDelBtn.className='close-btn-in-notify';

    notifyDelBtn.onclick=()=>{delNotification(notifyData.TicketsId);};

    notifyLabel.appendChild(notifyDelBtn);
    
    const notifyWindow=getNotifyWindow();
    notifyWindow.appendChild(notifyLabel);
}
  
function removeNotifyMessage()
{
    const notifyWindow=getNotifyWindow();
    
    const notifyChildren=notifyWindow.children;
    const notifyChildrenCnt=(notifyChildren.length);

    for(i=(notifyChildrenCnt-1);i >=3 ;i--)
      notifyWindow.removeChild(notifyWindow.children[i]);  
}


function createLabel(labelContent,isRead)
{
    var label = document.createElement('span');
    label.className = 'label';
    isRead?label.className='label-read':label.className='label';
    label.innerText=labelContent;
    return label;
}
    
function createLabelId(idVal,isRead)
{
    let id = document.createElement('span');
    isRead?isEmpty.className='id-read':id.className='id';
    id.innerText=`#${idVal}`;
    return id;
}
function createTicketContainer(data)
{
    let ticketContainer=document.createElement('div');
    ticketContainer.className='ticket-container';

    let container=getTicketsContainer();
    container.appendChild(ticketContainer);

    let ticket=createTickets(data);
      
    let afterTicket=createAfterTicket(data);

    ticketContainer.appendChild(ticket);
    ticketContainer.appendChild(afterTicket);
}
    
function createTickets(data)
{ 
    let ticket = document.createElement('button');
      
    ticket.className = 'ticket';
        //data.notify_status?ticket.className = 'unread-ticket':ticket.className='ticket';
    if(data.notify_status===1)
        ticket.className = 'unread-ticket';
    else
        ticket.className='ticket';
    /////////////////
    ticket.id = `ticket_${data.Id}`;
    ticket.name='ticket';

    ticket.onclick=()=>{connectTicket(JSON.stringify(data))};

    let labelId=document.createElement('div');
    labelId.className='id-label';

    let id=createLabelId(data.Id,data.notify_status);
    data.notify_status?id.className='id-read':id.className='id';

    let label=createLabel(data.FIO,data.notify_status);

    labelId.appendChild(id);
    labelId.appendChild(label);

    ticket.appendChild(labelId);

    return ticket;
}
function createAfterTicket(data)
{
    let afterTicket=document.createElement('button');
    afterTicket.className='after-ticket';
    let labelStatus;
    var selectTicketContainer;
    let status=defineTicketStatus(data.Status);

    if(!isUserAdmin()) //check if moderator
      labelStatus=createLabelStatus(status);
    else
    {
      labelStatus=createLabelStatusModerator(status,data);
      ///
      selectTicketContainer =  createSelectTicketContainer();
      let selectTicketBtn = createSelectTicketBtn();

      selectTicketContainer.appendChild(selectTicketBtn);
      ///
    }
    
    afterTicket.appendChild(labelStatus);
    ///
    if(checkStatistic())
      afterTicket.appendChild(selectTicketContainer);
    ///
    return afterTicket;
}
function createLabelStatusModerator(status,data)
{
    let select=document.createElement('select');
    select.className='label-select';
    select.value='status-moderator';

    let optionPending=document.createElement('option');
    let optionCompleted=document.createElement('option');
    let optionProcess=document.createElement('option');

    optionPending.innerText='PENDING';
    optionPending.value=statusPending;
    optionPending.className='label-pending';

    optionCompleted.innerText='COMPLETED';
    optionCompleted.value=statusCompleted;
    optionCompleted.className='label-completed';

    optionProcess.value=statusProcess;
    optionProcess.className='label-process';
    optionProcess.innerText='IN PROCESS';

    if(status==statusPending)
    {
      optionPending.selected=true;
      select.className+=' label-pending';
    }
    else if(status==statusCompleted)
    {
      optionCompleted.selected=true;
      select.className+=' label-completed';
    }
    else
    {
      optionProcess.selected=true;
      select.className+=' label-proccess';
    }
    select.appendChild(optionPending);
    select.appendChild(optionCompleted);
    select.appendChild(optionProcess);

    select.addEventListener('change',(event)=>{
      connectLabelModerator(select,JSON.stringify(data));
    });
    //
    return select
}
function createLabelStatus(status,ticket)
{
    let  label=document.createElement('div');
    let  labelText = document.createElement('p');

    if(status==statusPending)
    {
      label.className='label-pending';
      labelText.textContent='PENDING';
    }
    else if(status==statusProcess)
    {
      label.className='label-proccess';
      labelText.textContent='IN PROCESS';
    }
    else
    {
      label.className='label-completed';
      labelText.textContent='COMPLETED';
    }
    label.appendChild(labelText);

    return label;
}
function createTicketsMessageEmpty(message=null)
  {
    let tickets=getTickets();

    let messageEmpty=document.createElement('div');
    messageEmpty.className='tickets-empty';
    message==null?messageEmpty.innerText='No tickets':messageEmpty.innerText=message;
    
    tickets.appendChild(messageEmpty);  
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
function createLoading()
{
 let loadingContainer = document.createElement('div');
 loadingContainer.id="loading-id";
 let loading=document.createElement('div');
  const parentElement=document.getElementsByClassName('information')[0];

  loadingContainer.className='loading-container';
  loading.className='loading';

  loadingContainer.appendChild(loading);
  parentElement.appendChild(loadingContainer);
}
function startLoading()
{
  let loadingContainer=document.getElementById('loading-id');
  (loadingContainer==null)?createLoading():loadingContainer.style.display='block';
}
function stopLoading()
{
  let loadingContainer=document.getElementById('loading-id');
  if(loadingContainer!=null)
    loadingContainer.style.display="none";
}

///////////////////////
function createSelectTicketContainer()
{
  let selectTicketContainer = document.createElement('div');
  selectTicketContainer.className="select-ticket-container";
  return selectTicketContainer;
}

function createSelectTicketBtn()
{
  let selectTicketBtn = document.createElement('input')
  selectTicketBtn.type='checkbox';
  selectTicketBtn.className="select-ticket-btn";

  selectTicketBtn.onclick=()=>{selectUnselectTicket();}

  return selectTicketBtn;
}

function showNotificationCnt(notCount,isEndless=false)
{
  let notifyCount=getNotifyCntElement();
  if(!isEndless)
    notifyCount.innerText=notCount;
  else
    notifyCount.innerText='∞';

  notifyCount.style.display='block';
}
function hideNotificationCnt()
{
  let notifyCount=getNotifyCntElement();
  notifyCount.innerText='';
  notifyCount.style.display='none';
}

function getCheckedTickets()
{
  let ticketsContainer = getTicketsContainer();
  let tickets=ticketsContainer.children;
  let checkedTickets=[];

  for(i=0;i<tickets.length;i++)
  {
    let curTickets=tickets[i].children[0];
    let curAfterTickets=tickets[i].children[1];
    let curCheckbox=curAfterTickets.children[1].children[0];

    if(curCheckbox.checked)
    {
      let labelId=curTickets.children[0].children[0].innerText;
      labelId=getCurTicketId(labelId);
      checkedTickets.push(labelId);
    }
  }
  return checkedTickets;
}
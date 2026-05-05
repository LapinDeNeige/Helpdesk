window.onload = function()
{
  
  titleName=getTitleName();
  setInterval(()=>{checkNotification()},1000);
  getStatistic();
  getProblemsStatistic();
  ///
  setActiveBtnColor();
  createVersion();
  ///
}


function selectUnselectTicket()
{
  let tickets = getCheckedTickets();
  (tickets.length == 0)?blockRemoveAll():unblockRemoveAll();
  
  let curCheckbox=event.target;    
  (!curCheckbox.checked)?unselectTicket(curCheckbox):selectTicket(curCheckbox);
}
function selectUnselectAll()
{
  let curCheckbox=event.target;

  let tickets = getCheckedTickets();
  (tickets.length == 0)?unblockRemoveAll():blockRemoveAll();
  
  (!curCheckbox.checked)?unselectAll():selectAll();
}
function selectTicket(ticket)
{
  let cur = ticket;
  let tickets=cur.parentElement.parentElement.parentElement.children;
  let curTicket = tickets[0];
  let afterTicket = tickets[1];

  /*
  curTicket.children[0].children[0].className="label-selected";
  curTicket.children[0].children[1].className="id-selected";
  */

  curTicket.className="selected-ticket";
  afterTicket.className="selected-after-ticket";
}
function selectAll()
{
  let ticketsContainer = getTicketsContainer();
  for (i=0;i<ticketsContainer.children.length;i++)
  {
    let curAfterTicket = ticketsContainer.children[i].children[1];
    let curTicket = ticketsContainer.children[i].children[0];

    /*
    curTicket.children[0].children[0].className="id-selected";
    curTicket.children[0].children[1].className="label-selected";
    */
    curTicket.className=="unread-ticket"?curTicket.className="unread-ticket":curTicket.className="selected-ticket";
    curAfterTicket.className="selected-after-ticket";

    //curAfterTicket.style.backgroundColor="var(--ticket-selected)";
    let curSelectTicket = curAfterTicket.children[1].children[0];
    curTicket.className=="unread-ticket"?curTicket.style.backgroundColor="var(--accent)":curTicket.style.backgroundColor="var(--bg-content)";

    //curTicket.style.backgroundColor="var(--ticket-selected)";
    curSelectTicket.checked=true;
  }
}
function unselectTicket(ticket)
{
  let cur = ticket;
  let tickets=cur.parentElement.parentElement.parentElement.children;
  let curTicket = tickets[0];
  let curAfterTicket = tickets[1];
  
  /*
  curTicket.children[0].className="label";
  curTicket.children[1].className="id";
  */

  curTicket.className="ticket";
  curAfterTicket.className="after-ticket";
}
function unselectAll()
{
  let ticketsContainer = getTicketsContainer();
  for (i=0;i<ticketsContainer.children.length;i++)
  {
    let curAfterTicket = ticketsContainer.children[i].children[1];
    let curTicket = ticketsContainer.children[i].children[0];
    curTicket.className=="unread-ticket"?curTicket.className="unread-ticket":curTicket.className="ticket";
    curAfterTicket.className="after-ticket";

    let curSelectTicket = curAfterTicket.children[1].children[0];
    //curTicket.style.backgroundColor="var(--bg-content)";
    
    curSelectTicket.checked=false;
  }
}
function hideSelectAll()
{
  let selectAll=getSelectAll();
  selectAll.style.display='none';
}
function showSelectAll()
{
  let selectAll=getSelectAll();
  selectAll.style.display='block';
}
function hideRemoveAll()
{
  let removeAll=getRemoveAll();
  removeAll.style.display='none';
}
function showRemoveAll()
{
  let removeAll=getRemoveAll();
  removeAll.style.display='block';
}
  
function blockRemoveAll()
{
  let removeAll=getRemoveAll();
  removeAll.style.pointerEvents='none';
  removeAll.className='remove-tickets-btn-disabled';
}
function unblockRemoveAll()
{
  let removeAll=getRemoveAll();
  removeAll.style.pointerEvents='auto';
  removeAll.className='remove-tickets-btn';
}
function updateProblemStatistic()
{
  getProblemsStatistic();
} 
function showStatPending(pendingData)
{
    let pending=getPendingStat();
    pending.innerText=pendingData;
}
function showStatProcess(processData)
{
    let process=getProcessStat();
    process.innerText=processData;
}
function showStatCompleted(completedData)
{
    let completed=getCompletedStat();
    completed.innerText=completedData;
}

function showStatCartidges(cartridgesCnt)
{
  let cartrige=getCartridgeStat();
  cartrige.innerText=cartridgesCnt;
}

function showStatSign(signCnt)
{
  let sign=getSignStat();
  sign.innerText=signCnt;
}
function showStatPass(passCnt)
{
  let pass=getPassStat();
  pass.innerText=passCnt;
}

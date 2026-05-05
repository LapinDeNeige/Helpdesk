
     function getBtnPending()
     {
        let btnGetPending = document.getElementById('pending');
        return btnGetPending;
     }
     function getBtnProceed()
     {
        let btnGetProcceed = document.getElementById('in-proceed');
        return btnGetProcceed;
     }
     function getBtnCompleted()
     {
        let btnGetCompleted = document.getElementById('completed');
        return btnGetCompleted;
     }
     function getBtnAll()
     {
        let  btnGetAll = document.getElementById('all');
        return btnGetAll;
     }
     function getBtnCloseDialog()
     {
        let btnCloseDialog= document.getElementById('close-btn-ticket');
        return btnCloseDialog;
     }
     
     function getBtnSearch()
     {
        let btnSearch=document.getElementById('search-id');
        return btnSearch;
     }
     var btnGetMy = document.getElementById('my');
     
     function getNotifyCntElement()
     {
        let notifyCount=document.getElementById('notify');
        return notifyCount;
     }
     function getNotifyWindow()
     {
        let notifyWindow=document.getElementById('notify-window-id');
        return notifyWindow;
     }

     function getTicketWindow()
     {
        let ticketWindow = document.getElementById('tickets-dialog-id');
        return ticketWindow;
     }
     function getTickets()
     {
        let tickets=document.getElementsByClassName('tickets')[0];
        return tickets;
     }
     
     function getPendingStat()
     {
         let pending=document.getElementById('pending-ticket-count');
         return pending;
     }
     function getProcessStat()
     {
         let process=document.getElementById('in-proccess-ticket-count');
         return process;
     }
     function getCompletedStat()
     {
      let completed=document.getElementById('completed-ticket-count');
      return completed;
     }
     function getCartridgeStat()
     {
      let cartridges=document.getElementById('replace-cartrige-count');
      return cartridges;
     }
     function getSignStat()
     {
      let sign=document.getElementById('create-e-signature-count');
      return sign;
     }
     function getPassStat()
     {
      let pass=document.getElementById('create-a-pass-count');
      return pass;
     }
     function checkStatistic()
     {
      let result=document.getElementById('info-ticket-id');
      if(result==null)
         return false;
      return true;
     }
     
     function getTicketsContainer()
     {
         let container = document.getElementsByClassName('tickets')[0];
         return container;
     }
     function getSelectAll()
     {
      let selectAll=document.getElementById('select-all');
      return selectAll;
     }
     function getRemoveAll()
     {
      let removeAll=document.getElementById('remove-tickets-id');
      return removeAll;
     }
     

     btnNotify=document.getElementById('notify-container-id');
     
     btnCloseNofity=document.getElementById('close-btn-notify');
     
    


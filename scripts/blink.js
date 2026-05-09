 var titlePromiseStatus=null;;
 var titleName;

  function getTitle()
  {
    let title=document.getElementsByTagName('title')[0];
    return title;
  }
  function setTitleName()
  {
    titleName=getTitleName();
  }
  function getTitleName()
  {
    let title=getTitle();
    let titleName=title.innerText;

    return titleName;
  }
  
  function getCurrentTitle()
  {
    return document.title;
  }
  function setCurrentTitle(titleName)
  {
    document.title=titleName;
  }
  function renameTitle(originanTitle,newTitle)
  {
    getCurrentTitle()==originanTitle?setCurrentTitle(newTitle):setCurrentTitle(originanTitle);
  }
  function blinkTitle()
  {
    let status=setInterval(renameTitle,800,titleName,'***New notification***');

    return status;
  }
  ///
  function unblinkTitle()
  {
    if(titlePromiseStatus==null)
      return;

    clearInterval(titlePromiseStatus);
    setCurrentTitle(titleName);

    titlePromiseStatus=null;
  }

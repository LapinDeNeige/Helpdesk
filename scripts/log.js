async function readLogFile()
{
  try
  {
    const response = await axios.get('/log');  
    if(response.data.result=='OK')
      return response;
    else
      return false;
    
  }
  catch(err)
  {
    throw new Error(err);
    console.log(`Error getting log data ${err}`);
  }
}


function getLog()
{
  
  readLogFile().then((result)=>{
    if(!result)
      alert('Error')
    else
    {
      removeLogMessages();
      if(result.data.data.length == 0)
      {
      	createLogEmpty();
      }
      else
      {
        
	      for(i=0;i<result.data.data.length;i++)
	      {
	      	createLogMessage(result.data.data[i]);
	  	  }
  	  }
      openLogWindow();
    }
    
  })
  .catch((err)=>{
    alert(err);
  })
}
function createLogMessage(message)
{
  const logWindow=document.getElementById('log-window');
  const logMessage=document.createElement('p');
  logMessage.innerText=message;
  logWindow.appendChild(logMessage);
}  
function createLogEmpty()
{
  const logWindow=document.getElementById('log-window');
  const logEmpty=document.createElement('p');
  logEmpty.className='logs-message-empty';
  logEmpty.innerText='No logs';
  logWindow.appendChild(logEmpty);
}
function removeLogMessages()
{
	const logWindow=document.getElementById('log-window');

    for(i=(logWindow.children.length-1);i >(1) ;i--)
    {
      logWindow.removeChild(logWindow.children[i]);
    }
    
}
function openLogWindow()
{
  let logWindow=document.getElementById('log-window');
  logWindow.style.display='block';
}
function closeLogWindow()
{
  let logWindow=document.getElementById('log-window');
  logWindow.style.display='none';
}
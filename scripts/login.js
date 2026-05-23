////////////
function getLoginWindow()
{
	const loginContainer=document.getElementById('login-container-id');//.length;
	//alert(loginContainer);
	return loginContainer;	
}
function shakeLogin()
{
  const loginContainer =getLoginWindow();
  
 	setTimeout(()=>{loginContainer.style.left='10%'},50);
 	setTimeout(()=>{loginContainer.style.left='50%'},100);
 	setTimeout(()=>{loginContainer.style.left='20%'},150);
 	setTimeout(()=>{loginContainer.style.left='40%'},200);
 	setTimeout(()=>{loginContainer.style.left='30%'},250);
}

/////////// 

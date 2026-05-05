async function checkUserAuth()
{
  try
  {
    const response= await axios.get('/isAuth');  
    if(response.data.isAuth=='OK')
      return true;
    else
      return false;
  }
  catch(err)
  {
    console.log(`Error getting user's auth status ${err}`);
    alert(`Error getting user's auth status ${err}`); 
  }
}
function isUserAdmin()
{
  let curUrl=window.location.href;
  return curUrl.includes('moderator');
} 

const dbWrapper = require('db-wrapper');
const db_wrapper= new dbWrapper();

const passport = require('passport');
exports.loginGet  = async(request,response)=>
{     
      const result = await db_wrapper.getUserCount();
      const userCount = parseInt(result.count,"10");
      
      userCount == 0?response.render('login',{error:request.query.error,isFirstTime:'true'}):response.render('login',{error:request.query.error,isFirstTime:'false'});    
}
exports.loginPost = async(request,response,next)=>
{
    return passport.authenticate('local', {successRedirect: '/moderator',
                                  failureRedirect: '/login?error=one',})(request,response,next);
}
exports.logout = async(request,response)=>{
    request.logout((err) => {
        response.redirect('/login');
    });
}
const dbWrapper=require('db-wrapper');
const db_wrapper = new dbWrapper();

const passport = require('passport');
const localAuth = require('passport-local').Strategy;

passport.use(new localAuth(
  (username, password, done) => {
    data={user:username,password:password};
    db_wrapper.getLogin(data).then((result)=>{
      if(result)
        return done(null,{id:1,username:username});
      else
        return done(null,false,{result:'Error login'});
    });
  }
));
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  const user = { id: 1, username: 'user' };
  done(null, user);
});

async function isAuthenticated(request, response, next) {
  const result = await db_wrapper.getUserCount();
  const userCount = parseInt(result.count,"10");

  if(userCount == 0)
  {
    return next();
  }

	if (request.isAuthenticated()) {
		return next();
	}
  response.redirect('/login');
} 

module.exports=isAuthenticated;
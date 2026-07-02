const express = require('express');
const validation=require('validation');
const crypto = require('crypto');
const passport = require('passport');
const Log=require('log');
const session = require('express-session');
const logFile=require('./config/config_log/config_log.js');
///

///
require('dotenv').config();

const app = express();

const logger=new Log();
///

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname));

app.use(express.urlencoded({ extended: true }));

app.use(session(
	{
		secret: crypto.randomBytes(32).toString('hex'),
		resave: false,
		saveUninitialized: false,
    cookie: {
      maxAge:350000,
      secure:false
    }
	}));

app.use(passport.initialize());
app.use(passport.session());


///
app.use('/',require('./routes/auth'));
app.use('/',require('./routes/stat'));
app.use('/',require('./routes/registration'));
app.use('/',require('./routes/notify'));
app.use('/',require('./routes/upload'));
app.use('/',require('./routes/tickets'));
app.use('/',require('./routes/log'));
///
  
  app.get('*',(request,response)=>{
    response.render('not_found');
  });
  
  //
  app.listen(process.env.PORT,process.env.HOST,()=>{
    console.log(`Listening on ${process.env.HOST}:${process.env.PORT}`);
  });
  //
    
/*
function sendEmail(mailTo,message,subject)
{
    try
    {
      mail.sendMail(mailTo,message,subject);
      logger.log('Mail successfully sent');
    }
    catch(err)
    {
      logger.log(`Error sending mail ${err}`);
      //throw new SyntaxError('Mail error'); //mail problems
    }
    
}
*/
///////////////////////////////////////////////////

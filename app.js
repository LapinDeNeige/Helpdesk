const express = require('express');
const validation=require('validation');
const crypto = require('crypto');

const wrapper= require('db-wrapper');
const jData=require('json-data');

const Log=require('log');
const jsonFile=require('./package.json');

const { request } = require('http');
const { emitKeypressEvents } = require('readline');

const bodyParser=require('body-parser');
const passport = require('passport');
const localAuth = require('passport-local').Strategy;
const session = require('express-session');

const upload=require('upload');

const logFile=require('./config/config_log/config_log.js');
///
const mailer = require('mail');
///
require('dotenv').config();

const urlEncoded=bodyParser.urlencoded({extended:true});

const app = express();
const validate=new validation();
const logger=new Log();

const db_wrapper=new wrapper();
const jsonData=new jData();

const uploadConfig=new upload();
///
const mail=new mailer();
///
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname));




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


app.get('/login', (request, response) => {

    db_wrapper.getUserCount().then((result)=>{
      const userCount = parseInt(result.count,"10");
      
      if(userCount == 0)
        response.render('login',{error:request.query.error,isFirstTime:'true'});
      else
        response.render('login',{error:request.query.error,isFirstTime:'false'});
    });

  
});

app.post('/login',
	passport.authenticate('local', {successRedirect: '/moderator',
                                  failureRedirect: '/login?error=one',})
);

app.get('/logout', (request, response) => {
  logger.log('User logout');
  console.log('User logout');
	request.logout((err) => {
		response.redirect('/login');
	});
});

app.get('/registration',isAuthenticated,(request,response)=>{
  response.render('registration');
});

app.post('/registration',isAuthenticated,(request,response)=>{
  const data={username:request.body.username,password:request.body.password};
   db_wrapper.registerUser(data).then((result)=>{
    if(result)
      response.render('registerResult',{'status':'OK'});
    else
      response.render('registerResult',{'status':'Error'});
   });
});

app.get('/', (request, response) => {
    response.render('index');
});

app.get('/index',(request,response)=>{
    response.render('index');
});
app.get('/support', (request, response) => {
    response.render('support');
});

app.get('/tickets', (request, response) => { 
    db_wrapper.getData(response).then((result)=>{
      if(!result)
        response.render('tickets',{'status':'Error','data':{}});  
      else
        response.render('tickets',{'status':'OK','data':result});
      
    });
});

  app.get('/isAuth',(request,response)=>{
    if(request.isAuthenticated())
      response.json({'isAuth':'OK'});
    else
      response.json({'isAuth':'Fail'});
  
 });
  app.get('/searchTickets',(request,response)=>{
    let params=request.query.params;
    db_wrapper.searchData(params).then((result)=>{
      if(!result)
        response.json({'status':'SrchError','message':'Error searching data'});
      else
        response.json({'status':'OK','message':result});
    });
    
    
  });

  app.get('/getNotify',(request,response)=>{
    db_wrapper.getAllNotifications().then((result)=>{
      if(!result)
        response.json({'status':'ReadAllNotifyError','message':'Error getting notifications'});
      else
        response.json({'status':'OK','message':result})
    });
  });
  
  app.get('/checkNotify',(request,response)=>{
     db_wrapper.checkNotifications(response).then((result)=>{
        if(!result)
          response.json({'status':'ChckNotifyError','message':'Error getting notifications'});
        else
          response.json({'status':'OK','message':result}); 
    });
    
  });

  app.post('/readNotify',urlEncoded,(request,response)=>{
      let params=request.body.params;
      db_wrapper.readNotification(params).then((result)=>{
        if(!result)
          response.json({'status':'ReadNotifyError'});
        else
          response.json({'status':'OK'});
        

      });
  });
  
  app.post('/delNotify',(request,response)=>{
      const id=request.body.params;
      
      db_wrapper.delNotification(id).then((result)=>{
        if(!result)
          response.json({'status':'DelNotifyErr'});
        else
          response.json({'status':'OK'});
      });
      
      
  });
  
  app.post('/tickets',(request,response)=>{
      if(!request.body)
        response.sendError(400);

      params=request.body.params;
      db_wrapper.getData(params).then((result)=>{
      if(!result)
        response.json({'status':'Error','data':{}});
      else
        response.json({'status':'OK','data':result});
      
    });
  });
  
  app.get('/moderator', isAuthenticated,(request, response) => {
    db_wrapper.getData(response).then((result)=>{
      if(!result)
        response.render('moderator',{'status':'Error','data':{}});
      else
        response.render('moderator',{'status':'OK','data':result});
    });
    
  });
  
  app.get('/stat',isAuthenticated,(request,response)=>{
    db_wrapper.getStatistic().then((result)=>{
      if(!result)
        response.json({'status':'GetStatError','result':'Error getting status'});
      else
        response.json({'status':'OK','result':result});
    });
  });

  app.get('/statProblem',isAuthenticated,(request,response)=>{
    let problem=request.query.problem;
    db_wrapper.getStatisticProblem(problem).then((result)=>{
      if(!result)
        response.json({'status':'GetStatProblemError','result':'Error getting problem status'});
      else
        response.json({'status':'OK','result':result});
    })    

  });
  /////
  app.post('/upload',(request,response)=>{
    let ticketId=request.body.ticketId;
    
    db_wrapper.uploadFile({'ticketId':ticketId}).then((result)=>{
        if(!result)
          response.json({'status':'GetUploadError','result':'Error getting file'});
        else
          response.json({'status':'OK','result':result})
    });
  });
  app.post('/getUpload',(request,response)=>{
    let ticketId=request.body.ticketId;
    
    db_wrapper.getUploadFile({'ticketId':ticketId}).then((result)=>{
        if(!result)
          response.json({'status':'GetUploadError','result':'Error getting file'});
        else
          response.json({'status':'OK','result':result[0]})
    });
  });
  
  app.post('/updateStatus',(request,response)=>{
    if(!request.body)
      response.sendError(400);

    let params=request.body.params;
    db_wrapper.updateStatus(params).then((result)=>{
      if(!result)
        response.json({'status':'UpdateStatError','result':'Error updating status'});
      else
        response.json({'status':'OK','result':'Data successfully sent'});
    });
  });


  app.get('/version',(request,response)=>{
   response.json({'currentVersion':jsonFile.version}); 
  });

  app.get('/log',isAuthenticated,(request,response)=>{

      logger.readLog().then((result)=>{
        response.json({'result':'OK','data':result});
      }).catch((err)=>{
        response.json({'result':'Err','message':err})
      })
    

  });
  

  app.get('*',(request,response)=>{
    response.render('not_found');
  });
  
  //
  app.listen(process.env.PORT,process.env.HOST,()=>{
    console.log(`Listening on ${process.env.HOST}:${process.env.PORT}`);
  });
  //
  app.post('/removeTicket',isAuthenticated,(request,response)=>{
          let retStatus='OK';

          let ticketId=request.body.data.id;
          
          if(!db_wrapper.delNotification(ticketId))
            logger.log(`Error remove notifications`);
          
          if(!db_wrapper.removeTicket(ticketId))
          {
            logger.log(`Error remove ticket`);
            retStatus='Err';
          }
          response.json({'status':retStatus});
        });  
  
  app.post('/',urlEncoded,uploadConfig.uploadFile().single('upload'),(request, response)=>  
  {
    if(!request.body)
      response.sendError('400');
   
    let name=request.body.name;
    let email=request.body.email;
    let phone=request.body.phone;
    let problem=request.body.problem;
    let description=request.body.description;
    
    let descValidationResult=null;
    let uploadValidationResult=null;
      
    const nameValidationResult=validate.validateMessage(name);
    const emailValidationResult=validate.validateEmail(email);
    const phoneValidationResult=validate.validateMessage(phone);
    
    (problem=='create-e-signature' ||problem=='create-a-pass'||problem=='request-report-card') ? descValidationResult=true : descValidationResult=validate.validateMessage(description);
    
    (problem=='create-e-signature')?uploadValidationResult=request.file : uploadValidationResult=true;

    const problemValidationResult=validate.validateProblem(problem);
    
    if(!nameValidationResult||!emailValidationResult||!phoneValidationResult||!descValidationResult||!problemValidationResult ||!uploadValidationResult)  
    {
      const  errorMessage=[];

      if(!nameValidationResult)
        errorMessage.push('name');
      if(!emailValidationResult)
        errorMessage.push('email');
      if(!phoneValidationResult)
        errorMessage.push('phone');
      if(!descValidationResult)
        errorMessage.push('description');
      if(!problemValidationResult)
        errorMessage.push('problem');

      if(!uploadValidationResult) 
        errorMessage.push('upload');
      
      logger.log(`Error sending application`);
      console.log(`Error sending application`);
      response.render('result',{status:'MsgError',errors:errorMessage});  
    }
    else
    {
      data=jsonData.getJsonData(request.body);
      db_wrapper.addData(data).then((result)=>{
        if(result)
        {
          if(problem=='create-e-signature')
          {
            const  fileUrl=`${request.protocol}`+'://'+`${request.headers.host}`+'/'+`${request.file.path}`.replace(/\\/g,'/');
            db_wrapper.uploadFile({'path':fileUrl});
          }
          response.render('result',{'status':'OK','message':'Your application has successfully been sent'});
          //
          sendEmail(email,"Dear user,your message has been successfully sent",'Helpdesk');
          //
        }
        else
          response.render('result',{'status':'DBError','message':'Some error occured'});
      });
      
    }
      
  } ); 



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

///////////////////////////////////////////////////

const router = require('express').Router();
const isAuthenticated = require('auth');
const Log=require('log');
const logger=new Log();

 router.get('/log',isAuthenticated,(request,response)=>{

      logger.readLog().then((result)=>{
        response.json({'result':'OK','data':result});
      }).catch((err)=>{
        response.json({'result':'Err','message':err})
      })
    

  });

module.exports = router; 

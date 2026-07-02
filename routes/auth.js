const router = require('express').Router();

const wrapper= require('db-wrapper');
const db_wrapper=new wrapper();

const authController = require('../controllers/authController');

router.get('/login',authController.loginGet);

router.post('/login',authController.loginPost);
	
router.get('/logout', authController.logout); 

router.get('/isAuth',(request,response)=>{
    request.isAuthenticated()?response.json({'isAuth':'OK'}):response.json({'isAuth':'Fail'});
 });

module.exports=router;
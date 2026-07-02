const isAuthenticated = require('auth');
const router = require('express').Router();

const registrationController = require('../controllers/registrationController');

 router.get('/registration',isAuthenticated,registrationController.registrationGet);

router.post('/registration',isAuthenticated,registrationController.registrationPost);
module.exports=router;

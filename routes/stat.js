const router = require('express').Router();
//
const dbWrapper=require('db-wrapper');
const db_wrapper = new dbWrapper();
const auth=require('auth');
//

const statController = require('../controllers/statController');

router.get('/stat',auth,statController.getStat);

router.get('/statProblem',auth,statController.getStatProblem);
module.exports=router;
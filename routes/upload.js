const wrapper= require('db-wrapper');
const router = require('express').Router();
const uploadController=require('../controllers/uploadController');
/////
  router.post('/upload',uploadController.uploadFile);
  router.post('/getUpload',uploadController.getUpload);
   

  module.exports = router;

const router = require('express').Router();
const isAuthenticated = require('auth');
const ticketsController = require('../controllers/ticketsController');

const upload=require('upload');

const bodyParser=require('body-parser');

const uploadConfig=new upload();
const urlEncoded=bodyParser.urlencoded({extended:true});

const versionsFile=require('../package.json');



router.get('/tickets', ticketsController.getTickets);
router.get('/searchTickets',ticketsController.searchTickets);  
router.post('/tickets',ticketsController.postTickets); 
router.get('/moderator',isAuthenticated,ticketsController.getModerator);
router.post('/removeTicket',isAuthenticated,ticketsController.removeTicket);
router.post('/updateStatus',isAuthenticated,ticketsController.updateStatus);

router.post('/',urlEncoded,uploadConfig.uploadFile().single('upload'),ticketsController.addTicket);


router.get('/', (request, response) => {
    response.render('index');
});

router.get('/index',(request,response)=>{
    response.render('index');
});
router.get('/support', (request, response) => {
    response.render('support');
});

router.get('/version',(request,response)=>{
   response.json({'currentVersion':versionsFile.version}); 
  });

module.exports = router;


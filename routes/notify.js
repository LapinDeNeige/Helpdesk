
const router = require('express').Router();

const notifyController = require('../controllers/notifyController');
router.get('/getNotify',notifyController.getNotify);
  
router.get('/checkNotify',notifyController.checkNotify);

router.post('/readNotify',notifyController.readNotify);
  
router.post('/delNotify',notifyController.delNotify); 
 
module.exports = router;
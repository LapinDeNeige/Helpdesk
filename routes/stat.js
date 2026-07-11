const router = require('express').Router();
const isAuthenticated = require('auth');

const statController = require('../controllers/statController');

router.get('/stat',isAuthenticated,statController.getStat);
router.get('/statProblem',isAuthenticated,statController.getStatProblem);

module.exports = router 

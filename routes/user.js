const router = require('express').Router();
const {checkForAuthorization} = require('../controllers/auth')
const{getProfile} = require('../controllers/user');

router.get('/profile',checkForAuthorization,getProfile);

module.exports = router;
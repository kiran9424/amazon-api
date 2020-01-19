const router = require('express').Router();
const {userSignUp,signIn} = require('../controllers/auth');

router.post('/signup',userSignUp);
router.post('/signin',signIn);

module.exports = router;
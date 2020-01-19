const router = require('express').Router();
const {checkForAuthorization} = require('../controllers/auth')
const {createAddress,getAddress,getCountries} = require('../controllers/address')

router.post('/address',checkForAuthorization,createAddress);
router.get('/address',checkForAuthorization,getAddress)
router.get('/address/countries',checkForAuthorization,getCountries)
module.exports = router;
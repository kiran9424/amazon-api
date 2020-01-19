const router = require('express').Router();
const {checkForAuthorization} = require('../controllers/auth')
const {shipment,createPayment} = require('../controllers/payment');

router.get('/shipment',shipment);
router.post('/payment',checkForAuthorization, createPayment)

module.exports = router;
const router = require('express').Router();
const {getSearch} = require('../controllers/search');


router.post('/search',getSearch);
module.exports = router;
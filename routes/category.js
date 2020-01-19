const router = require('express').Router();
const {createCategory, getAllCategory} = require('../controllers/category');

router.post('/category',createCategory);
router.get('/category',getAllCategory);
module.exports = router;
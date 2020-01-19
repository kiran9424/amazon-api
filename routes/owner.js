const router = require('express').Router();
const {createOwner, getAllOwner} = require('../controllers/owner');
const upload = require('../middlewares/upload-photo')
router.post('/owner', upload.single('photo') ,createOwner);
router.get('/owner',getAllOwner);
module.exports = router;
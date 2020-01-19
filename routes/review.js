const router = require('express').Router();
const {postReview,getReviews} = require('../controllers/review');
const {checkForAuthorization} = require('../controllers/auth');
const upload = require('../middlewares/upload-photo');

router.post('/reviews/:productId',[checkForAuthorization,upload.single('photo')],postReview);
router.get('/reviews/:productId',getReviews);
module.exports = router;
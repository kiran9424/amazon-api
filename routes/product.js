const router = require('express').Router();
const upload = require('../middlewares/upload-photo')
const {createProduct,getAllProduct,getSingleProduct,updateSingleProduct,deleteSingleProduct} = require('../controllers/product');

router.post('/products',upload.single('photo'),createProduct);
router.get('/products',getAllProduct);
router.get('/products/:productId',getSingleProduct)
router.patch('/products/:productId',upload.single('photo'),updateSingleProduct)
router.delete('/products/:productId',deleteSingleProduct)
module.exports = router;
const express = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct, getProductById } = require('../controllers/productController');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();

router.route('/product/new').post( createProduct);
router.route('/products').get( getProducts);
router.route('/product/:id').get(getProductById).put( updateProduct).delete(deleteProduct);
module.exports = router;


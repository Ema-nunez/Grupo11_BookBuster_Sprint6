const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')
const upload = require('../middleware/middlemulter')
const jerarquiaMiddleware = require('../middleware/jerarquiaMiddleware')


router.get('/cart', productController.cart);

router.get('/detailProduct/:id', productController.detail);

router.get('/createProduct', jerarquiaMiddleware, productController.create);

router.post('/storeProduct', upload.single("portada"), productController.store);

router.get('/edit/:id', jerarquiaMiddleware ,productController.edit)

router.put('/edit/:id', productController.update)

router.post("/delete/:id", productController.eliminar)
module.exports = router;
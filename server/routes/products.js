const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

const multer = require('../mddleware/multer-config');
const auth = require('../mddleware/auth');

// Get All Products
router.get('/',auth,productController.getAll);
// Route to det product by id
router.get('/:id',productController.getById);
// Route to add new product
router.post('/add',multer,productController.add);
// Update product
router.post('/edit/:id',multer,productController.update);
// Route to delete product
router.delete('/:id',productController.delete);

module.exports = router;
var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/category');

router.get('/',categoryController.getAll);
router.post('/add',categoryController.add);
router.get('/:id',categoryController.getById);
router.put('/:id',categoryController.update);
router.delete('/:id',categoryController.delete);

module.exports = router;
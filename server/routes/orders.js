var express = require('express');
var router = express.Router();
var orderController = require('../controllers/order');

router.get('/',orderController.getAll);
router.get('/:id',orderController.getById);
router.post('/add',orderController.add);
router.put('/update',orderController.update);
router.delete('/delete',orderController.delete);

module.exports = router;
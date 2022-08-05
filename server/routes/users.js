var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
/* GET users listing. */

router.post('/admin-signup',userController.signUp);
router.post('/admin-signin',userController.signIn);

module.exports = router;
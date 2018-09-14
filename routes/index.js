var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');

router.get('/', user_controller.index);

module.exports = router;
var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');

router.get('/', user_controller.index);
router.post('/uploadprofileimage', user_controller.uploadprofileimage);
module.exports = router;
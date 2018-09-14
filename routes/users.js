var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');

router.delete('/:name', user_controller.user_delete);
router.post("/", user_controller.user_add);
router.post("/login", user_controller.user_login);
module.exports = router;
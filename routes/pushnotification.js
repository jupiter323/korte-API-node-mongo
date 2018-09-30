var express = require('express');
var router = express.Router();
var push_controller = require('../controllers/fcmpushController');

router.post('/', push_controller.pushsend);
router.post('/sendall', push_controller.push_all);
module.exports = router;
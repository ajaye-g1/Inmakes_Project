let express = require('express');
let router = express.Router();
let loginController = require('../controllers/login.controller');

router.route('/loginUser').post(loginController.checkLoginUser);
router.route('/signUpUser').post(loginController.signUpUser);

module.exports = router;
const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/', userController.showHomepage);

module.exports = router;

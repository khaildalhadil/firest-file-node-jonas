const controllers = require('../controllers/authControllers');
const express = require('express');
const router = express.Router();

router.post('/signup', controllers.signup);

module.exports = router
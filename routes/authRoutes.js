const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

// register a new user
router.post('/register', register);
// login an existing user
router.post('/login', login);

module.exports = router;

// authRouter.js

const express = require('express');
const router = express.Router();
const { registerUser } = require('../controller/Register.Controller');

// Route for user registration
router.post('/register', registerUser);

module.exports = router;




const express = require('express');
const router = express.Router();
const { loginUser } = require('../controller/Login.controller');

// Route for user login
router.post('/login', loginUser);

module.exports = router;

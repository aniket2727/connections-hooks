
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors());
app.use(express.json());
require('./database/config');
const dotenv = require('dotenv');
dotenv.config();




const authRouter = require('./router/Register.Router');
const LoginRouter=require('./router/Login.Router')


// Use the authRouter for registration routes
app.use('/auth', authRouter);
app.use('/auth',LoginRouter);
















// Start the server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
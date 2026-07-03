const express = require('express');
const AuthNestClient = require('authnest-server');
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const authnest = new AuthNestClient();

app.use(AuthNestClient.getSecurityMiddlewares());
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// This single line adds every AuthNest route (login, registration,
// logout, modals, settings, callbacks — everything)
app.use('/api/authnest', authnest.getRouter());

app.listen(process.env.PORT || 9000,()=>{
    console.log("server is running on " + process.env.PORT)
});
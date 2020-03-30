const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParse = require("cookie-parser")


const authRouter = require('../auth/auth-router');
const jokesRouter = require('../jokes/jokes-router.js');
const welcomeRouter = require("../welcome/welcome-router")
const restrictRole = require("../auth/restrict-role")
const authenticate = require('../auth/authenticate-middleware.js');






const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(cookieParse())

server.use("/",welcomeRouter )
server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, restrictRole("admin"),  jokesRouter);

module.exports = server;

const express = require("express");

const postsRouter = require('./data/helpers/posts-router.js')
const userRouter = require('./data/helpers/user-router.js')
const postDb = require("./data/helpers/postDb.js");
const userDb = require("./data/helpers/userDb.js");
const server = express();

server.use(express.json());



server.use('/api/posts', postsRouter);
 
module.exports = server;
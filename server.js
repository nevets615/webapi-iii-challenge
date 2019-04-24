const express = require("express");

const postsRouter = require('./data/helpers/posts-router.js')

const postDb = require("./data/helpers/postDb.js");

const server = express();

server.use(express.json());



server.use('/api/posts', postsRouter);
 
module.exports = server;
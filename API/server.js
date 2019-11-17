const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const logger = require('../middleware/logger');

// TODO declare routers

const server = express();

server.use(helmet());
server.use(logger);
server.use(express.json());
server.use(cors());

// TODO user() routers

server.get('/', (req, res) => {
  res.send('<h1>🎣</h1>');
})

module.exports = server;
const server = require('./API/server.js');

const port = process.env.PORT || 5000;
server.listen(`\n<<< Server running on port ${port} >>>\n`)
/*
 *  import modules
*/
const http = require('http');

// you can remove .js
const routes = require('./routes');

// get exported data.
console.log(routes.someText);

const server = http.createServer(routes.handler);



/*
 *  1. in this example we wil use port = 3000
 *  2. we can open 'http://localhost:3000/' and 'http://localhost:3000/message'
*/
server.listen(3000);

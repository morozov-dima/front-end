/*
 *  import modules
*/
const fs = require('fs');





/*
 *  1. we can use 'createServer' method of 'http' module that was included.
 *  2. we can set headers with 'setHeader' method.
 *  3. we can write some data to the response with 'write' method.
 *  4. once we done by creating this response we use 'end' method. when we write 'end()' - node.js
 *     will send data back to the client.
 *  5. we create arrow function that we store in the const.
 * 
*/
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  // user can enter some data, for '/' path.
  if (url === '/') {
    // write some data to the response
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    // end our response and exit function.   
    return res.end();
  }
  
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      // create new file (message.txt) and write some text in this file.   
      fs.writeFile('message.txt', message, err => {
        // set redirect status code. 302 - redirection. 
        res.statusCode = 302;
        // redirect user to '/'
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }


  // set headers to the response 
  res.setHeader('Content-Type', 'text/html');
  // write some data to the response
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  // once we done by creating this response.
  res.end();
};






// module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some text';

exports.handler = requestHandler;
exports.someText = 'Some hard coded text';
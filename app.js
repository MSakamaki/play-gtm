const http = require('http');
var fs = require('fs');
var path = require('path');

const hostname = '127.0.0.1';
const port = 3000;
const uriAPI = new RegExp('/api/*');

const server = http.createServer((req, res) => {

  var filePath = '.' + req.url;
  if (filePath == './') filePath = './index.html';

  if (uriAPI.test(filePath)){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ 'foo': 'bar' }));
  }else{

    fs.readFile(filePath, function(error, content) {
      if (error) {
        if(error.code == 'ENOENT') res.end('404\n');
        else {
          res.writeHead(500);
          res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
          res.end(); 
        }
      } else {
        res.statusCode = 200;

        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', '*');

        res.end(content, 'utf-8');
      }
    });
  }


});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
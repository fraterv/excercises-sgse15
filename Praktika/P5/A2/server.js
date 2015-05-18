var url = require('url');
var path = require('path');
var Db = require('./db').Mongo;
var mongo = new Db();
var static = require('node-static' ),
    port = 8080,
    http = require('http');

var file = new static.Server('./', { // static content, polymer
    cache: 3600,
    gzip: true
});

var server = http.createServer(function (req, res) {
  if (req.method != 'GET')
    return res.end('Only GET accepted\n')

  console.log(req.url);
  // see `node -pe "require('url').parse('/test?q=1', true)"`
  var request = url.parse(req.url, true);
  var pathname = request.pathname;

  if (/^\/zips\/\w+/.test(pathname)) {
    mongo.find("zips",
               {"city" : pathname.substr(pathname.lastIndexOf("/") + 1)},
               function(result) {
                 res.writeHead(200, {"Content-Type" : "application/json"});
                 var data = [{'index' : 0, 'selected' : false, 'city' : "Test"}]
                 res.end(JSON.stringify(result));
               });
  }
  else if (/^\/close/.test(pathname)) {
    mongo.close();
    res.writeHead(200);
    res.end();
  }
  else {
    req.addListener('end', function () {
      file.serve(req, res);
    }).resume();
  }
})

server.listen(port)

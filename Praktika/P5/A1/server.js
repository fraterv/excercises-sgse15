var url = require('url');
var http = require('http');
var time = require('./time');
var file = require('./file');
var static_dir = "./"

var listeners = {
  list : [],
  push : function(listener) {
    this.list.push(listener);
  },
  notify : function(text) {
    this.list.forEach(function(listener) {
      listener.write(text);
    });
  }
}

var server = http.createServer(function (req, res) {
               if (req.method != 'GET')
                 return res.end('Only GET accepted\n')

               // see `node -pe "require('url').parse('/test?q=1', true)"`
               var request = url.parse(req.url, true);
               var pathname = request.pathname;
               var result, code
               var head = null
               var content = null
               var data = ""

               if (/^\/monitor/.test(pathname)) {
                 listeners.push(res);
                 code = 200
               }
               else {
                 if (/^\/currenttime/.test(pathname)) {
                   code = 200
                   head = { 'Content-Type': 'application/json' }
                   content = JSON.stringify(time.jsonSecMinHour())
                   data = content
                 }
                 else if (/^\/file/.test(pathname)) {
                   result = file.content(static_dir, request.query.name);
                   data = static_dir + request.query.name
                   code = result.code

                   if (code == 200) {
                     head = { 'Content-Type': result.mime }
                     content = result.content
                   }
                 }
                 else { // unknown request
                   code = 404;
                   data = ""
                 }

                 res.writeHead(code, head);
                 res.end(content);
               }
               listeners.notify("GET " + code + " " +
                                request.pathname + " " + data);
             });

server.listen(80)

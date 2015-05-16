var fs = require('fs')

var mimes = {
  "html" : "text/html",
  "jpg" : "image/jpg",
  "css" : "text/css",
  "json" : "application/json",
  "js" : "text/javascript"
}

var mime = function(filename) {
  var mime = mimes[require('path').extname(filename).slice(1)];
  if (mime == undefined) {
    mime = '/text/plain';
  }
  return mime;
}

module.exports = {
  content : function(dir, filename) {
    if (!fs.existsSync(dir + filename)
      || !fs.statSync(dir + filename).isFile()) {

      return {"code" : 500}
    }

    var content = fs.readFileSync(dir + filename, 'utf8')
    return { "code" : 200, "content" : content, "mime" : mime(filename) };
  }
}

var http = require('http')

module.exports = {
  get : function(options, ondata, onerror, onend) {
    http.get(options, function(response) {
      if (response.statusCode == 404 ||
          response.statusCode == 500) {
        ondata(response.statusCode);
      }
      response.setEncoding('utf8');
      response.on("data", function(data) {
        ondata(null, data)
      })
      response.on("end", function() {
        if (onend) {
          onend(response)
        }
      })
      response.on("error", function(error) {
        console.log(error);
      })
    });
  }
}

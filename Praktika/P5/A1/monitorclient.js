var client = require('./client')

var options = {keepalive: true, hostname : "localhost", port : 80, path : "/monitor"}

client.get(options, function(error, data) {
  if (!error) {
    console.log(data);
  }
});

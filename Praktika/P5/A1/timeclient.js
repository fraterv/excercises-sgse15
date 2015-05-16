var client = require('./client')
var options = {hostname : "localhost", port : 80, path : "/currenttime"}

client.get(options, function(error, data) {
  if (!error) {
    console.log(data);
  }
});

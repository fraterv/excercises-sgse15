var client = require('./client')
var options = {hostname : "localhost", port : 80}

options['path'] = "/file?name=" + process.argv[2]
client.get(options, function(error, data) {
  if (error) {
    console.log("Received error: " + error);
    return;
  }
  console.log(data);
});

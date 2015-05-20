var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  console.info("Connected");
  var emailSchema = new mongoose.Schema({
    sender: { type: String }
  , text: String
  });

  var Email = mongoose.model("Email", emailSchema);
});

mongoose.connect('mongodb://localhost/praktikum');

var email = new Email({
  sender: "Philipp",
  text: "blindtext"
});

email.save(function(err, email) {
  if (err) {
    return console.error(err);
  }
  console.dir(email);
});

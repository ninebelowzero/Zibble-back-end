var MongoUri    = process.env.MONGOLAB_URI || 'mongodb://localhost/zibble';

var port        = process.env.PORT || 3000;

var host        = process.env.HEROKU_HTTP_URL || "http://localhost:" + port; 

var secret      = process.env.ZIBBLE_API_SECRET;

var config = {
  secret    : secret,
  database  : MongoUri,
  port      : port,
  host      : host
}

console.log("config params");
console.log(config);

module.exports = config;
var MongoUri   = process.env.MONGOLAB_URI || 'mongodb://localhost/zibble';

module.exports = {
  'secret'    : 'to-be-confirmed',
  'database'  : MongoUri
}
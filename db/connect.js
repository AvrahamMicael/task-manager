const { connect } = require('mongoose');
require('dotenv').config();

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = (testing = false) => connect(
    testing
      ? process.env.MONGO_TESTING_URI
      : process.env.MONGO_URI,
    connectionOptions
  )
  .then(() => console.log('Connected to the DB'))
  .catch(() => console.log('Failed to connect to the DB'));

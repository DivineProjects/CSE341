const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file
const { MongoClient } = require("mongodb");

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log("Db is already initialized!");
    return callback(null, _db);
  }
  // Connect to MongoDB using the URI from the .env file
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client.db(); // Access the database (it will default to the database in the URI)
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDatabase = () => {
  if (!_db) {
    throw Error("Db not initialized");
  }
  return _db;
};

module.exports = {
  initDb,
  getDatabase
};

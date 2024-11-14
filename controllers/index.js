const mongodb = require("../database/connect");
const { ObjectId } = require("mongodb");

const homeRouter = (req, res) => {
    res.send("Great Job, Amazing");
  };

const getAll = async (req, res) => {
  // Fetch the database and collection
  const db = mongodb.getDatabase();
  const result = await db.collection("users").find();
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // const objectId = new ObjectId(userId);
  // Fetch the database and the "users" collection
  const db = mongodb.getDatabase();
  const result = await db.collection("users").find({ _id: userId });
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users[0]);
  });
};

module.exports ={
    homeRouter,
    getAll,
    getSingle
}
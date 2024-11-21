const { response } = require("express");
const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId;



const homeRouter = (req, res) => {
  // #swagger.tags=["Users"]
    res.send("Great Job, Amazing");
  };

const getAll = async (req, res) => {
  // #swagger.tags=["Users"]
  // Fetch the database and collection
  const db = mongodb.getDatabase();
  const result = await db.collection("users").find();
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

const getSingle = async (req, res) => {
  // #swagger.tags=["Users"]
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

const createUser = async (req, res) => {
  // #swagger.tags=["Users"]
  // const userId = new ObjectId(req.params.id);
  const user = { 
    firstName: req.body.firstName, 
    lastName: req.body.lastName, 
    email: req.body.email, 
    favoriteColor: req.body.favoriteColor, 
    birthday: req.body.birthday 
  }
  const db = mongodb.getDatabase();
  const response = await db.collection("users").insertOne(user);
  if (response.acknowledged){
    res.status(204).send();
  } else
  {
    res.status(500).json(response.error || "Some error occured while creating the user")
  }
};

const updateUser = async (req, res) => {
  // #swagger.tags=["Users"]
  const userId = new ObjectId(req.params.id);
  const user = { 
    firstName: req.body.firstName, 
    lastName: req.body.lastName, 
    email: req.body.email, 
    favoriteColor: req.body.favoriteColor, 
    birthday: req.body.birthday 
  }
  const db = mongodb.getDatabase();
  const response = await db.collection("users").replaceOne({ _id : userId }, user);
  if (response.modifiedCount > 0){
    res.status(204).send();
  } else
  {
    res.status(500).json(response.error || "Some error occured while updating the user")
  }
};

const deleteUser = async (req, res) => {
  // #swagger.tags=["Users"]
  const userId = new ObjectId(req.params.id);
  const db = mongodb.getDatabase();
  const response = await db.collection("users").deleteOne({ _id : userId });
  if (response.deletedCount > 0){
    res.status(204).send();
  } else
  {
    res.status(500).json(response.error || "Some error occured while delete the user")
  }
};

module.exports ={
    homeRouter,
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
}
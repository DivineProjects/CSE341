const express = require("express");
const app = express();
const PORT = 8080;

app.use("/", require("./routes/index"));

const { initDb, getDb } = require("./database/connect");

// Initialize the database
initDb((err, db) => {
  if (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process if the DB connection fails
  }

  console.log("Connected to MongoDB ...");
  // You can now use the `getDb` function to interact with the database
  // const collection = getDb().collection("users");
  // console.log(collection);

  // Start the server once the DB is connected
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
});

const express = require("express");
const app = express();


const port = 8080;

app.use("/", require("./routes/index"));

// app.listen(process.env.PORT || port, () => {
//   console.log('Web Server is listening at port ' + (process.env.PORT || port));
// });

////////////////
// app.js or server.js
const { initDb, getDb } = require("./db/connect");


// Initialize the database
initDb((err, db) => {
  if (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process if the DB connection fails
  }

  console.log("Connected to MongoDB");

  // You can now use the `getDb` function to interact with the database
  const collection = getDb().collection("users");

  // Example: Insert a document
  collection.insertOne({ name: "John Doe", age: 30 })
    .then((result) => {
      console.log("Inserted user:", result.ops);
    })
    .catch((error) => {
      console.error("Error inserting user:", error);
    });

  // Start the server once the DB is connected
  app.listen(port, () => {
    console.log("Server is running on port 3000");
  });
});

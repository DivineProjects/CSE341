const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 8080;

app.use(bodyParser.json());
app.use("/", require("./routes"));

const { initDb } = require("./database/connect");

// Initialize the database
initDb((err, db) => {
  if (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process if the DB connection fails
  }

  console.log("Connected to MongoDB ...");
  // Start the server once the DB is connected
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
});

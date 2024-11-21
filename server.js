const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 8080;

app.use(bodyParser.json());

// CORS middleware to allow cross-origin requests
app.use((req, res, next) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all domains, or specify a domain
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Z-Key'); // Allow these headers

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow these methods
  
  // Handle pre-flight OPTIONS request (optional)
  // if (req.method === 'OPTIONS') {
  //   return res.status(200).end(); // Respond to preflight request
  // }

  // Proceed to next middleware or route handler
  next();
});


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

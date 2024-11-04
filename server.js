const express = require('express');
const app = express();
const port = 8080;
 
app.get('/', (req, res) => {
  res.send("Hello");
});

app.listen(process.env.PORT || port, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || port));
});
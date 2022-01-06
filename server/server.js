const express = require("express");
require("dotenv").config();
const app = express();

//import middleware
app.use(express.json())

//import routes
const gameRoutes = require('./Routes/router');

//import .env
const PORT = process.env.PORT;

//creating routes
app.use('/', gameRoutes);

app.listen(3001, () => {
  console.log(`Server Running on PORT 3001`);
});
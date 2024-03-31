const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(`Running at ${PORT}`);
});

app.listen(5000, console.log("Server port 5000"));

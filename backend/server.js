const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Event = require("./event");

const API_PORT = 3001;
const app = express();
const router = express.Router();

const dbRoute = process.env.MONGO_URL;
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("Connected successfully!"));
db.on("error", console.error.bind(console, "Connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

app.use("/api", router);

app.listen(API_PORT, function(){
  console.log('Listening on port: ' + this.address().port);
});
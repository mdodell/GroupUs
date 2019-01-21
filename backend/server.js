const mongoose = require("mongoose");
const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./models/user");
require("./services/passport");

const app = express();

app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [process.env.COOKIE_KEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true }
);
let db = mongoose.connection;
db.once("open", () => console.log("Connected successfully!"));
db.on("error", console.error.bind(console, "Connection error:"));

app.listen(process.env.SERVER_PORT, function(){
  console.log('Listening on port: ' + this.address().port);
});

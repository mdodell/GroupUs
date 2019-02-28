const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
 {
   userId: String,
   name: String,
   email: String,
   password: String,
   strategy: String,
   events: []
 }
);

mongoose.model("User", UserSchema);

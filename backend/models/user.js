const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
 {
   googleId: String,
   name: String,
   email: String
 }
);

mongoose.model("User", UserSchema);

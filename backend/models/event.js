const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventSchema = new Schema(
 {
   title: String,
   type: String,
   required: [String]
 },
);
mongoose.model("Event", EventSchema);

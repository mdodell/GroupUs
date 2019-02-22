const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventSchema = new Schema(
 {
   title: String,
   type: String,
   required: [String],
   properties: [],
   registrations: []
 },
);
mongoose.model("Event", EventSchema);

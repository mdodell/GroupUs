const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventSchema = new Schema(
 {
   title: String,
   type: String,
   description: String,
   userId: String,
   fromDate: Date,
   toDate: Date,
   dateCreated: Date,
   required: [String],
   properties: [],
   registrations: []
 },
);
mongoose.model("Event", EventSchema);

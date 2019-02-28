const mongoose = require("mongoose");
const { Schema } = mongoose;

const RegistrationSchema = new Schema(
    {
        eventId: String,
        properties: {}
    }
);

mongoose.model("Registration", RegistrationSchema);

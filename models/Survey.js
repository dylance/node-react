const mongoose = require("mongoose");
const { Schema } = mongoose;

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  yes: { Number, default: 0 },
  no: { Number, default: 0 }
});

mongoose.model("surveys", surveySchema);

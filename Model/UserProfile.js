const { Schema, model } = require("mongoose");

const UserProfileSchema = new Schema({
  name: {
    type: String,
  },
  designation: {
    type: String,
  },
  idustry: {
    type: String,
  },
  education: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
}, {timestamps:true});

module.exports = model("user", UserProfileSchema);

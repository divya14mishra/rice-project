const mongoose = require("mongoose");
mongoose.pluralize(null);
const user_data_schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    inputState: {
      type: String,
      required: true,
    },
    inputCity: {
      type: String,
      required: true,
    },
    inputZip: {
      type: String,
      required: true,
    },
    inputCountry: {
      type: String,
      required: true,
    },
    usertype: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("user_data", user_data_schema);

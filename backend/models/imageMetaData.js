const mongoose = require("mongoose");
mongoose.pluralize(null);
const image_data_schema = new mongoose.Schema(
  {
    diceSore: {
      type: String,
    },
    filename: {
      type: String,
    },
    filepath: {
      type: String,
    },
    imageVolume: {
      type: String,
    },
    precision: {
      type: String,
    },
    resolution: {
      type: String,
    },
    sampleOrganism: {
      type: String,
    },
    samplingTime: {
      type: String,
    },
    shareStatus: {
      type: String,
    },
    state: {
      type: String,
    },
    staus: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("imageMetaData", image_data_schema);

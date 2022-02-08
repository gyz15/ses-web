const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  machineId: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

module.exports = Station = mongoose.model("Station", StationSchema);

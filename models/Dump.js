const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DumpSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  machineId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  level: {
    type: String,
    required: true,
    default: "info",
  },
});

module.exports = Dump = mongoose.model("Dump", DumpSchema);

const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  uploadJobId: { type: mongoose.Schema.Types.ObjectId, ref: "UploadJob" },
  transactionId: String,
  amount: Number,
  referenceNumber: String,
  date: Date,
  rawData: Object
});

module.exports = mongoose.model("Record", recordSchema);

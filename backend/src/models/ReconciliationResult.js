const mongoose = require("mongoose");

const reconciliationSchema = new mongoose.Schema({
  recordId: { type: mongoose.Schema.Types.ObjectId, ref: "Record" },
  uploadJobId: { type: mongoose.Schema.Types.ObjectId, ref: "UploadJob" },
  status: {
    type: String,
    enum: ["MATCHED", "PARTIAL", "UNMATCHED", "DUPLICATE"]
  },
  mismatchedFields: [String]
}, { timestamps: true });

module.exports = mongoose.model("ReconciliationResult", reconciliationSchema);

const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
  recordId: { type: mongoose.Schema.Types.ObjectId, ref: "Record" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  field: String,
  oldValue: String,
  newValue: String,
  source: {
    type: String,
    enum: ["SYSTEM", "MANUAL"]
  },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AuditLog", auditSchema);

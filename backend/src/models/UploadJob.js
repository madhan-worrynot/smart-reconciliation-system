const mongoose = require("mongoose");

const uploadJobSchema = new mongoose.Schema({
  fileName: String,
  status: {
    type: String,
    enum: ["PROCESSING", "COMPLETED", "FAILED"],
    default: "PROCESSING"
  },
  totalRecords: Number,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("UploadJob", uploadJobSchema);

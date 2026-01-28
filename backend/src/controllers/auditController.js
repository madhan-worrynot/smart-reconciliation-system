const AuditLog = require("../models/AuditLog");

exports.getAuditByRecord = async (req,res) => {
  const logs = await AuditLog.find({ recordId: req.params.recordId })
    .sort({ timestamp: 1 });

  res.json(logs);
};

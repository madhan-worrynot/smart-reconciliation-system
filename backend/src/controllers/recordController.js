const Record = require("../models/Record");
const AuditLog = require("../models/AuditLog");

exports.updateRecord = async (req, res) => {
  const record = await Record.findById(req.params.id);

  if (!record) return res.status(404).json({ message: "Not found" });

  const oldData = record.toObject();

  Object.assign(record, req.body);
  await record.save();

  // Create audit logs
  for (let field of ["transactionId", "amount", "referenceNumber", "date"]) {
    if (String(oldData[field]) !== String(record[field])) {
      await AuditLog.create({
        recordId: record._id,
        userId: req.user.id,
        field,
        oldValue: oldData[field],
        newValue: record[field],
        source: "USER"
      });
    }
  }

  res.json({ message: "Updated successfully" });
};

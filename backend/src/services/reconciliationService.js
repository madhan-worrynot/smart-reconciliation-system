const Record = require("../models/Record");
const ReconciliationResult = require("../models/ReconciliationResult");
const AuditLog = require("../models/AuditLog");

const PARTIAL_VARIANCE = 0.02; // 2%

exports.runReconciliation = async (uploadJobId) => {
  const records = await Record.find({ uploadJobId });

  const txnMap = new Map();

  // STEP 1 — Detect duplicates
  for (let r of records) {
    if (txnMap.has(r.transactionId)) {
      await ReconciliationResult.create({
        recordId: r._id,
        uploadJobId,
        status: "DUPLICATE"
      });

      await AuditLog.create({
        recordId: r._id,
        field: "status",
        oldValue: "PENDING",
        newValue: "DUPLICATE",
        source: "SYSTEM"
      });

      continue;
    }
    txnMap.set(r.transactionId, r);
  }

  // STEP 2 — Match logic
  for (let r of records) {

    const exact = await Record.findOne({
      transactionId: r.transactionId,
      amount: r.amount,
      _id: { $ne: r._id }
    });

    if (exact) {
      await ReconciliationResult.create({
        recordId: r._id,
        uploadJobId,
        status: "MATCHED"
      });

      await AuditLog.create({
        recordId: r._id,
        field: "status",
        oldValue: "PENDING",
        newValue: "MATCHED",
        source: "SYSTEM"
      });

      continue;
    }

    const partial = await Record.findOne({
      referenceNumber: r.referenceNumber,
      _id: { $ne: r._id }
    });

    if (partial) {
      const diff = Math.abs(partial.amount - r.amount) / r.amount;

      if (diff <= PARTIAL_VARIANCE) {
        await ReconciliationResult.create({
          recordId: r._id,
          uploadJobId,
          status: "PARTIAL",
          mismatchedFields: ["amount"]
        });

        await AuditLog.create({
          recordId: r._id,
          field: "amount",
          oldValue: partial.amount.toString(),
          newValue: r.amount.toString(),
          source: "SYSTEM"
        });

        continue;
      }
    }

    // STEP 3 — Unmatched
    await ReconciliationResult.create({
      recordId: r._id,
      uploadJobId,
      status: "UNMATCHED"
    });

    await AuditLog.create({
      recordId: r._id,
      field: "status",
      oldValue: "PENDING",
      newValue: "UNMATCHED",
      source: "SYSTEM"
    });
  }
};

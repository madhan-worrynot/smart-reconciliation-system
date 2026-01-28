const Record = require("../models/Record");
const ReconciliationResult = require("../models/ReconciliationResult");

exports.getStats = async (req, res) => {
  try {
    const { fromDate, toDate, status } = req.query;

    const recordFilter = {};

    if (fromDate || toDate) {
      recordFilter.date = {};
      if (fromDate) recordFilter.date.$gte = new Date(fromDate);
      if (toDate) recordFilter.date.$lte = new Date(toDate);
    }

    // Get records within date range
    const records = await Record.find(recordFilter).select("_id");

    const recordIds = records.map(r => r._id);

    let resultFilter = {
      recordId: { $in: recordIds }
    };

    if (status && status !== "ALL") {
      resultFilter.status = status;
    }

    const total = await ReconciliationResult.countDocuments(resultFilter);
    const matched = await ReconciliationResult.countDocuments({ ...resultFilter, status: "MATCHED" });
    const unmatched = await ReconciliationResult.countDocuments({ ...resultFilter, status: "UNMATCHED" });
    const duplicate = await ReconciliationResult.countDocuments({ ...resultFilter, status: "DUPLICATE" });
    const partial = await ReconciliationResult.countDocuments({ ...resultFilter, status: "PARTIAL" });

    const accuracy = total
      ? ((matched / total) * 100).toFixed(2)
      : "0.00";

    res.json({
      total,
      matched,
      unmatched,
      duplicate,
      partial,
      accuracy
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Dashboard stats error" });
  }
};

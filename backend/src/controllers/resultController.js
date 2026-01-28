const ReconciliationResult = require("../models/ReconciliationResult");

exports.getResultsByJob = async (req, res) => {
  const results = await ReconciliationResult.find({
    uploadJobId: req.params.jobId
  }).populate("recordId");

  res.json(results);
};

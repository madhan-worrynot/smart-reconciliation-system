const { runReconciliation } = require("../services/reconciliationService");

exports.startReconciliation = async (req, res) => {
  const { uploadJobId } = req.params;

  runReconciliation(uploadJobId); // async

  res.json({ message: "Reconciliation started" });
};

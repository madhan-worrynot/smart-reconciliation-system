const express = require("express");
const router = express.Router();
const { startReconciliation } = require("../controllers/reconciliationController");
const { protect, allowRoles } = require("../middlewares/authMiddleware");

router.post(
  "/:uploadJobId",
  protect,
  allowRoles("ADMIN", "ANALYST"),
  startReconciliation
);

module.exports = router;

const express = require("express");
const router = express.Router();
const { getAuditByRecord } = require("../controllers/auditController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/:recordId", protect, getAuditByRecord);

module.exports = router;

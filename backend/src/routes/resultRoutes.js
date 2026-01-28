const express = require("express");
const router = express.Router();
const { getResultsByJob } = require("../controllers/resultController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/:jobId", protect, getResultsByJob);

module.exports = router;

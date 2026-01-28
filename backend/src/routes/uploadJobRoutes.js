const express = require("express");
const router = express.Router();
const { getAllJobs } = require("../controllers/uploadJobController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, getAllJobs);

module.exports = router;

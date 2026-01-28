const express = require("express");
const router = express.Router();
const { updateRecord } = require("../controllers/recordController");
const { protect } = require("../middlewares/authMiddleware");

router.put("/:id", protect, updateRecord);

module.exports = router;

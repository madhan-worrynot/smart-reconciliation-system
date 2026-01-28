const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");
const { uploadFile } = require("../controllers/uploadController");
const { protect, allowRoles } = require("../middlewares/authMiddleware");

router.post(
  "/",
  protect,
  allowRoles("ADMIN", "ANALYST"),
  upload.single("file"),
  uploadFile
);

module.exports = router;

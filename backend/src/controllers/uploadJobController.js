const UploadJob = require("../models/UploadJob");

exports.getAllJobs = async (req, res) => {
  const jobs = await UploadJob.find()
    .sort({ createdAt: -1 });

  res.json(jobs);
};

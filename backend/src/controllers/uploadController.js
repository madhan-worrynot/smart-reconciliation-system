// const UploadJob = require("../models/UploadJob");
// const Record = require("../models/Record");
// const fs = require("fs");
// const csv = require("csv-parser");

// exports.uploadFile = async (req, res) => {

//   // ✅ Get column mapping sent from frontend
//   const mapping = JSON.parse(req.body.mapping);

//   const job = await UploadJob.create({
//     fileName: req.file.filename,
//     uploadedBy: req.user.id,
//     status: "PROCESSING"
//   });

//   res.json({
//     message: "File uploaded. Processing started.",
//     jobId: job._id
//   });

//   const records = [];

//   fs.createReadStream(`uploads/${req.file.filename}`)
//     .pipe(csv())
//     .on("data", (row) => records.push(row))
//     .on("end", async () => {

//       for (let r of records) {

//         await Record.create({
//           uploadJobId: job._id,

//           // ✅ Dynamically mapped fields
//           transactionId: r[mapping.transactionId],
//           amount: Number(r[mapping.amount]),
//           referenceNumber: r[mapping.referenceNumber],
//           date: new Date(r[mapping.date]),

//           rawData: r
//         });
//       }

//       job.status = "COMPLETED";
//       job.totalRecords = records.length;
//       await job.save();
//     });
// };


const UploadJob = require("../models/UploadJob");
const Record = require("../models/Record");
const fs = require("fs");
const csv = require("csv-parser");

// ✅ Import reconciliation service
const { runReconciliation } = require("../services/reconciliationService");

exports.uploadFile = async (req, res) => {

  // ✅ Column mapping from frontend
  const mapping = JSON.parse(req.body.mapping);

  const job = await UploadJob.create({
    fileName: req.file.filename,
    uploadedBy: req.user.id,
    status: "PROCESSING"
  });

  // Respond immediately (background processing continues)
  res.json({
    message: "File uploaded. Processing started.",
    jobId: job._id
  });

  const records = [];

  fs.createReadStream(`uploads/${req.file.filename}`)
    .pipe(csv())
    .on("data", (row) => records.push(row))
    .on("end", async () => {

      try {

        // ✅ Save all records first
        for (let r of records) {
          await Record.create({
            uploadJobId: job._id,

            transactionId: r[mapping.transactionId],
            amount: Number(r[mapping.amount]),
            referenceNumber: r[mapping.referenceNumber],
            date: new Date(r[mapping.date]),

            rawData: r
          });
        }

        // ⚡ AUTO RUN RECONCILIATION
        await runReconciliation(job._id);

        // ✅ Mark job done
        job.status = "COMPLETED";
        job.totalRecords = records.length;
        await job.save();

        console.log("Upload + Auto reconciliation finished:", job._id);

      } catch (err) {
        console.error("Upload processing failed:", err);

        job.status = "FAILED";
        await job.save();
      }
    });
};


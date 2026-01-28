const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/upload", require("./src/routes/uploadRoutes"));
app.use("/api/reconcile", require("./src/routes/reconciliationRoutes"));
app.use("/api/dashboard", require("./src/routes/dashboardRoutes"));
app.use("/api/audit", require("./src/routes/auditRoutes"));
app.use("/api/results", require("./src/routes/resultRoutes"));
app.use("/api/jobs", require("./src/routes/uploadJobRoutes"));
app.use("/api/records", require("./src/routes/recordRoutes"));









mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log("Mongo Connected"))
  .catch(err => console.log(err));

app.get("/", (req,res)=> res.send("API Running"));

app.listen(5000, ()=> console.log("Server running on 5000"));

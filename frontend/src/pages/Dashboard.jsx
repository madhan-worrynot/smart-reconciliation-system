

import { useEffect, useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "./Dashboard.css";

const COLORS = ["#22c55e", "#ef4444", "#f97316"];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("ALL");

  useEffect(() => {
    api.get("/dashboard/stats", {
      params: { fromDate, toDate, status }
    }).then(res => setStats(res.data));
  }, [fromDate, toDate, status]);

  if (!stats) return <p className="dash-loading">Loading...</p>;

  const chartData = [
    { name: "Matched", value: stats.matched },
    { name: "Unmatched", value: stats.unmatched },
    { name: "Duplicate", value: stats.duplicate }
  ];

  return (
    <Layout>

      <div className="dashboard">

        {/* Filters */}
        <div className="dash-filters">
          <input type="date" onChange={e => setFromDate(e.target.value)} />
          <input type="date" onChange={e => setToDate(e.target.value)} />

          <select onChange={e => setStatus(e.target.value)}>
            <option value="ALL">All Status</option>
            <option value="MATCHED">Matched</option>
            <option value="UNMATCHED">Unmatched</option>
            <option value="DUPLICATE">Duplicate</option>
          </select>
        </div>

        {/* Stats */}
        <div className="dash-cards">
          <Stat label="Total" value={stats.total} />
          <Stat label="Matched" value={stats.matched} />
          <Stat label="Unmatched" value={stats.unmatched} />
          <Stat label="Duplicate" value={stats.duplicate} />
          <Stat label="Accuracy %" value={stats.accuracy} />
        </div>

        {/* Chart */}
        <div className="dash-chart">
          <PieChart width={320} height={320}>
            <Pie
              data={chartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {COLORS.map((c, i) => (
                <Cell key={i} fill={c} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

      </div>
    </Layout>
  );
}

function Stat({ label, value }) {
  return (
    <div className="dash-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

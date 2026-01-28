import { useEffect, useState } from "react";
import api from "../api/api";
import "./Jobs.css";

export default function Jobs({ onSelect }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/jobs").then(res => setJobs(res.data));
  }, []);

  return (
    <div className="jobs-box">

      <h2 className="jobs-title">Upload History</h2>

      <div className="jobs-table-wrapper">
        <table className="jobs-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Records</th>
              <th>Status</th>
              <th className="action-col">Action</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map(j => (
              <tr key={j._id}>
                <td>{new Date(j.createdAt).toLocaleString()}</td>
                <td>{j.totalRecords}</td>
                <td className={`job-status ${j.status.toLowerCase()}`}>
                  {j.status}
                </td>
                <td className="action-col">
                  <button
                    className="view-btn"
                    onClick={() => onSelect(j._id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

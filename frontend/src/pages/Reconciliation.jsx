import { useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";
import Jobs from "./Jobs";
import "./Reconciliation.css";

export default function Reconciliation() {
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [edited, setEdited] = useState({});
  const [audit, setAudit] = useState([]);

  const loadResults = async (jobId) => {
    const res = await api.get(`/results/${jobId}`);
    setResults(res.data);
    setSelected(null);
    setAudit([]);
  };

  const loadAudit = async (recordId) => {
    const res = await api.get(`/audit/${recordId}`);
    setAudit(res.data);
  };

  const saveCorrection = async () => {
    await api.put(`/records/${selected.recordId._id}`, edited);
    alert("Correction saved");
    loadAudit(selected.recordId._id);
  };

  return (
    <Layout>
      <div className="recon-container">

        <Jobs onSelect={loadResults} />

        <div className="recon-main">

          <table className="recon-table">
            <thead>
              <tr>
                <th>Txn</th>
                <th>Amount</th>
                <th>Ref</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {results.map(r => (
                <tr
                  key={r._id}
                  onClick={() => {
                    setSelected(r);
                    setEdited(r.recordId);
                    loadAudit(r.recordId._id);
                  }}
                >
                  <td>{r.recordId.transactionId}</td>
                  <td>{r.recordId.amount}</td>
                  <td>{r.recordId.referenceNumber}</td>
                  <td className={`status ${r.status.toLowerCase()}`}>
                    {r.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selected && (
            <div className="recon-panels">

              {/* Manual Correction */}
              <div className="panel">
                <h3>Manual Correction</h3>

                <Field
                  label="Transaction ID"
                  value={edited.transactionId}
                  onChange={v => setEdited({ ...edited, transactionId: v })}
                />

                <Field
                  label="Amount"
                  value={edited.amount}
                  onChange={v => setEdited({ ...edited, amount: v })}
                />

                <Field
                  label="Reference Number"
                  value={edited.referenceNumber}
                  onChange={v => setEdited({ ...edited, referenceNumber: v })}
                />

                <Field
                  label="Date"
                  type="date"
                  value={edited.date?.slice(0,10)}
                  onChange={v => setEdited({ ...edited, date: v })}
                />

                <button className="save-btn" onClick={saveCorrection}>
                  Save Correction
                </button>
              </div>

              {/* Audit Timeline */}
              {audit.length > 0 && (
                <div className="panel">
                  <h3>Audit Timeline</h3>

                  <div className="timeline">
                    {audit.map(a => (
                      <div key={a._id} className="timeline-item">
                        <span className={`dot ${a.source.toLowerCase()}`} />
                        <div>
                          <strong>{a.source}</strong>
                          <p>{a.field}: {a.oldValue} → {a.newValue}</p>
                          <small>{new Date(a.timestamp).toLocaleString()}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}

function Field({ label, value, onChange, type="text" }) {
  return (
    <div className="field-row">
      <label>{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}

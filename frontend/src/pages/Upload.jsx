// import { useState } from "react";
// import Papa from "papaparse";
// import api from "../api/api";
// import Layout from "../components/Layout";

// const SYSTEM_FIELDS = [
//   { key: "transactionId", label: "Transaction ID" },
//   { key: "amount", label: "Amount" },
//   { key: "referenceNumber", label: "Reference Number" },
//   { key: "date", label: "Date" }
// ];

// export default function Upload() {
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState([]);
//   const [headers, setHeaders] = useState([]);
//   const [mapping, setMapping] = useState({});

//   const handleFile = (e) => {
//     const f = e.target.files[0];
//     setFile(f);

//     Papa.parse(f, {
//       header: true,
//       preview: 20,
//       complete: (res) => {
//         setPreview(res.data);
//         setHeaders(Object.keys(res.data[0]));
//       }
//     });
//   };

//   const setField = (sys, col) => {
//     setMapping(prev => ({ ...prev, [sys]: col }));
//   };

//   const uploadFile = async () => {
//     for (let f of SYSTEM_FIELDS) {
//       if (!mapping[f.key]) {
//         return alert(`Map ${f.label}`);
//       }
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("mapping", JSON.stringify(mapping));

//     await api.post("/upload", formData);
//     alert("Uploaded successfully");
//   };

//   return (
//     <Layout>
//       <div className="p-6 space-y-4">

//         <input type="file" onChange={handleFile} />

//         {headers.length > 0 && (
//           <div className="bg-white p-4 rounded shadow space-y-2">

//             <h3 className="font-bold mb-2">Column Mapping</h3>

//             {SYSTEM_FIELDS.map(f => (
//               <div key={f.key} className="flex gap-3 items-center">
//                 <span className="w-40">{f.label}</span>

//                 <select
//                   className="border p-2 rounded flex-1"
//                   onChange={e => setField(f.key, e.target.value)}
//                 >
//                   <option value="">Select column</option>
//                   {headers.map(h => (
//                     <option key={h} value={h}>{h}</option>
//                   ))}
//                 </select>
//               </div>
//             ))}
//           </div>
//         )}

//         {preview.length > 0 && (
//           <div className="overflow-auto border">

//             <table className="w-full text-sm">
//               <thead className="bg-gray-100">
//                 <tr>
//                   {headers.map(h => (
//                     <th key={h} className="border p-2">{h}</th>
//                   ))}
//                 </tr>
//               </thead>

//               <tbody>
//                 {preview.map((row, i) => (
//                   <tr key={i}>
//                     {headers.map(h => (
//                       <td key={h} className="border p-2">{row[h]}</td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//           </div>
//         )}

//         {file && (
//           <button
//             onClick={uploadFile}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Upload with Mapping
//           </button>
//         )}

//       </div>
//     </Layout>
//   );
// }


import { useState } from "react";
import Papa from "papaparse";
import api from "../api/api";
import Layout from "../components/Layout";
import "./Upload.css"; // CSS Connect panrom

const SYSTEM_FIELDS = [
  { key: "transactionId", label: "Transaction ID" },
  { key: "amount", label: "Amount" },
  { key: "referenceNumber", label: "Reference Number" },
  { key: "date", label: "Date" }
];

export default function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [mapping, setMapping] = useState({});

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    
    setFile(f);

    Papa.parse(f, {
      header: true,
      preview: 5, // Just 5 rows for preview
      skipEmptyLines: true,
      complete: (res) => {
        setPreview(res.data);
        if (res.data.length > 0) {
            setHeaders(Object.keys(res.data[0]));
        }
      }
    });
  };

  const setField = (sys, col) => {
    setMapping(prev => ({ ...prev, [sys]: col }));
  };

  const uploadFile = async () => {
    for (let f of SYSTEM_FIELDS) {
      if (!mapping[f.key]) {
        return alert(`Please map the field: ${f.label}`);
      }
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("mapping", JSON.stringify(mapping));

    try {
        await api.post("/upload", formData);
        alert("Success! File uploaded.");
        // Optional: clear state
        setFile(null);
        setPreview([]);
    } catch (err) {
        alert("Upload failed.");
    }
  };

  return (
    <Layout>
      <div className="upload-wrapper">
        
        {/* Title Section */}
        <div className="page-header">
            <h2 className="page-title">Upload Data</h2>
            <p className="page-subtitle">Import your bank statements or ledger CSV.</p>
        </div>

        {/* 1. Simple File Input */}
        <div className="upload-container">
            <label className="input-label">Select CSV File:</label>
            <input 
                type="file" 
                accept=".csv"
                onChange={handleFile}
                className="simple-file-input"
            />
        </div>

        {/* 2. Mapping Section (Only shows if file is selected) */}
        {headers.length > 0 && (
          <div className="mapping-container">
            <h3 style={{fontSize:'18px', fontWeight:'600', marginBottom:'15px'}}>Map Columns</h3>
            
            <div className="mapping-grid">
              {SYSTEM_FIELDS.map(f => (
                <div key={f.key} className="mapping-item">
                  <label>{f.label} <span style={{color:'red'}}>*</span></label>
                  <select
                    className="mapping-select"
                    onChange={e => setField(f.key, e.target.value)}
                  >
                    <option value="">-- Select --</option>
                    {headers.map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Preview Table */}
        {preview.length > 0 && (
          <div className="table-wrapper">
             <h3 style={{fontSize:'18px', fontWeight:'600', marginBottom:'15px'}}>Preview</h3>
             <table className="preview-table">
               <thead>
                 <tr>
                   {headers.map(h => <th key={h}>{h}</th>)}
                 </tr>
               </thead>
               <tbody>
                 {preview.map((row, i) => (
                   <tr key={i}>
                     {headers.map(h => <td key={h}>{row[h]}</td>)}
                   </tr>
                 ))}
               </tbody>
             </table>

             <button onClick={uploadFile} className="btn-primary">
                Upload File
             </button>
          </div>
        )}

      </div>
    </Layout>
  );
}
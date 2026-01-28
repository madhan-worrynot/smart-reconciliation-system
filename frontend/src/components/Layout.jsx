import { Link } from "react-router-dom";
import "./Layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout">

      <aside className="sidebar">

        <h2 className="logo">Smart Reconciliation</h2>

        <nav className="menu">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/upload">Upload</Link>
          <Link to="/reconciliation">Reconciliation</Link>
        </nav>

      </aside>

      <main className="content">
        {children}
      </main>

    </div>
  );
}

import { useNavigate } from "react-router-dom";

export default function Transfer() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fb", padding: "16px", fontFamily: "Arial" }}>
      <button onClick={() => navigate("/dashboard")} style={{ padding: "10px 18px", background: "black", color: "white", borderRadius: "20px", border: "none" }}>← Back to Dashboard</button>
      
      <div style={{ background: "white", borderRadius: "16px", padding: "20px", marginTop: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
        <h2 style={{ margin: "0 0 4px 0" }}>Instant Transfer ⚡</h2>
        <p style={{ margin: "0 0 16px 0", fontSize: "13px", color: "#10b981", fontWeight: "bold" }}>Powered by Flutterwave - Money arrives in seconds</p>

        <label style={{ fontSize: "12px", color: "#666" }}>Account Number</label>
        <input placeholder="0123456789" style={{ width: "100%", padding: "14px", borderRadius: "10px", border: "1px solid #ddd", marginBottom: "12px", marginTop: "4px" }} />

        <label style={{ fontSize: "12px", color: "#666" }}>Bank</label>
        <select style={{ width: "100%", padding: "14px", borderRadius: "10px", border: "1px solid #ddd", marginBottom: "12px", marginTop: "4px" }}>
          <option>Select Bank</option>
          <option>Access Bank</option>
          <option>UBA</option>
          <option>GTBank</option>
          <option>Opay</option>
          <option>Kuda</option>
          <option>Moniepoint</option>
          <option>PalmPay</option>
        </select>

        <label style={{ fontSize: "12px", color: "#666" }}>Amount ₦</label>
        <input placeholder="5000" style={{ width: "100%", padding: "14px", borderRadius: "10px", border: "1px solid #ddd", marginBottom: "16px", marginTop: "4px" }} />

        <button style={{ width: "100%", padding: "16px", background: "black", color: "white", borderRadius: "12px", border: "none", fontWeight: "bold", fontSize: "15px" }}>
          Transfer Instantly
        </button>

        <div style={{ marginTop: "14px", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
          <p style={{ fontSize: "11px", margin: 0, color: "#065f46" }}>✅ Instant Transfer Powered by Flutterwave ⚡</p>
          <p style={{ fontSize: "10px", margin: "4px 0 0 0", color: "#6b7280" }}>All transfers are secured and arrive in seconds</p>
        </div>
      </div>
    </div>
  );
}

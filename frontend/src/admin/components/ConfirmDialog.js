export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: "400px", textAlign: "center" }}>
        <p style={{ fontSize: "18px", marginBottom: "25px" }}>{message}</p>
        <div style={{ display: "flex", gap: "15px" }}>
          <button onClick={onCancel} className="submit-btn" style={{ background: "#ccc", flex: 1 }}>Cancel</button>
          <button onClick={onConfirm} className="submit-btn" style={{ flex: 1 }}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
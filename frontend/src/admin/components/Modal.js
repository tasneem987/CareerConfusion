export default function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        {children}

      </div>
    </div>
  );
}
import React from 'react';
import '../styles/TermsModal.css';

function TermsModal({ title, content, onClose, btnText}) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h1>{title}</h1>
        <div className="modal-content">{content}</div>
        <button onClick={onClose}>{btnText}</button>
      </div>
    </div>
  );
}

export default TermsModal;
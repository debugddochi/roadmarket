import React from 'react';
import '../styles/TermsModal.css';

function TermsModal({ title, content, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h1>{title}</h1>
        <div className="modal-content">{content}</div>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default TermsModal;
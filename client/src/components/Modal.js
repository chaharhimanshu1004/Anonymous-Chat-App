import React from 'react';
import '../styling/Modal.css'

const Modal = ({ children, closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <div className="images">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
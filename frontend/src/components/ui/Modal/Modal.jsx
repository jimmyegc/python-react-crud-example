import React, { useState, useEffect } from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, title, children }) => {
  const [visible, setVisible] = useState(isOpen);
  
  useEffect(() => {
    if (isOpen) setVisible(true);
  }, [isOpen]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 150); // espera la animación
  };

  if (!isOpen && !visible) return null;

  return (
    <div
      className={`nmda-modal-overlay ${isOpen ? "fade-in" : "fade-out"}`}
      onClick={handleClose}
    >
      <div
        className={`nmda-modal ${isOpen ? "zoom-in" : "zoom-out"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="nmda-modal-header">
          <h2>{title}</h2>
          <button className="nmda-modal-close" onClick={handleClose}>
            ✕
          </button>
        </header>
        <div className="nmda-modal-body">{children}</div>
        {/*         <footer className="nmda-modal-footer">
          <button className="btn-action delete" onClick={handleClose}>
            Cerrar
          </button>
        </footer> */}
      </div>
    </div>
  );
};

export default Modal;

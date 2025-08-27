import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";
import "./Toast.css";

const icons = {
  success: FaCheckCircle,
  error: FaExclamationCircle,
  info: FaInfoCircle,
  warning: FaExclamationTriangle
};

const Toast = ({ message, type = "info", duration = 3000, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Mostrar el toast
    setShow(true);

    // Ocultar el toast después de la duración
    const timer = setTimeout(() => setShow(false), duration);

    // Llamar a onClose después de animación de salida
    const removeTimer = setTimeout(() => {
      if (onClose) onClose();
    }, duration + 300); // 300ms = duración de transición hide

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [duration, onClose]);

  const Icon = icons[type] || FaInfoCircle;

  return (
    <div className={`nmda-toast ${type} ${show ? "show" : "hide"}`}>
      <span className="toast-icon"><Icon /></span>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={() => setShow(false)}>✕</button>
    </div>
  );
};

export default Toast;

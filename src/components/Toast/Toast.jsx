import { useEffect } from "react";
import {
  toastBaseStyle,
  toastTypeStyles,
  toastMessageStyle,
  toastCloseButtonStyle,
} from "./toastStyles.js";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-cierre después de 5 segundos

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div
      className={`${toastBaseStyle} ${
        toastTypeStyles[type] || toastTypeStyles.info
      }`}
    >
      <p className={toastMessageStyle}>{message}</p>
      <button onClick={onClose} className={toastCloseButtonStyle}>
        X
      </button>
    </div>
  );
};

export { Toast };

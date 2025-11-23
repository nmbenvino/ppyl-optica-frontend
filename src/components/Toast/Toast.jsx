import { useEffect } from "react";
import toastStyle from "./Styles.js";

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
      className={`${toastStyle.base} ${
        toastStyle.type[type] || toastStyle.type.info
      }`}
    >
      <p className={toastStyle.message}>{message}</p>
    </div>
  );
};

export { Toast };

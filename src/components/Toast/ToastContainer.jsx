import { useNotification } from "../Notification/useNotification.jsx";
import { Toast } from "./Toast.jsx";
import { toastContainerStyle } from "./toastStyles.js";

const ToastContainer = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className={toastContainerStyle}>
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};

export { ToastContainer };

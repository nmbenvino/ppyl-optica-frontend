import { useNotification } from "../Notification/useNotification.js";
import { Toast } from "./Toast.jsx";
import toastStyle from "./Styles.js";

const ToastContainer = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className={toastStyle.container}>
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

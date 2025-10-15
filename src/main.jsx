import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router.jsx";
import { NotificationProvider } from "./components/Notification/NotificationContext.jsx";
import { ToastContainer } from "./components/Toast/ToastContainer.jsx";

createRoot(document.getElementById("root")).render(
  <NotificationProvider>
    <Router />
    <ToastContainer />
  </NotificationProvider>
);

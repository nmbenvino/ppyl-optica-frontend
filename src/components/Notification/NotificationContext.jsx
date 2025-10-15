import React, { createContext, useState, useCallback } from "react";

export const NotificationContext = createContext();

let id = 1;

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = "info") => {
    const newNotification = {
      id: id++,
      message,
      type,
    };
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((n) => n.id !== id)
    );
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

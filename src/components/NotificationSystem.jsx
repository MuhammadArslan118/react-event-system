// components/NotificationSystem.js
import React, { useState } from "react";
import { Bell } from "lucide-react";
import useEventBus from "../hooks/useEvent";
import { EVENT_TYPES } from "../utils/eventBus";

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);

  useEventBus(EVENT_TYPES.NOTIFICATION_SHOW, (notification) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { ...notification, id }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  });

  const getNotificationStyle = (type) => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-yellow-500 text-black";
      default:
        return "bg-blue-500 text-white";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 ${getNotificationStyle(
            notification.type
          )}`}
        >
          <div className="flex items-center space-x-2">
            <Bell size={16} />
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;

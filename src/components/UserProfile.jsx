// components/UserProfile.js
import React, { useState } from "react";
import { User } from "lucide-react";
import useEventBus from "../hooks/useEvent";
import { EVENT_TYPES } from "../utils/eventBus";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    points: 0,
  });

  const emitNotification = useEventBus(EVENT_TYPES.NOTIFICATION_SHOW);

  // Listen for points addition
  useEventBus(EVENT_TYPES.USER_POINTS_ADD, (points) => {
    setUser((prev) => ({ ...prev, points: prev.points + points }));
    emitNotification({
      type: "success",
      message: `You earned ${points} points!`,
    });
  });

  // Listen for profile updates
  useEventBus(EVENT_TYPES.USER_PROFILE_UPDATE, (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
    emitNotification({
      type: "info",
      message: "Profile updated successfully!",
    });
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <div className="bg-blue-500 p-3 rounded-full">
          <User className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-blue-600 font-semibold">Points: {user.points}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

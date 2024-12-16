import React from 'react';
import { MdFullscreenExit } from "react-icons/md";

export const Header = ({ user }) => {
  // Example user data (replace with actual props or context)
  const { name = "Nitesh Kumar Yadav", profilePic="https://images.unsplash.com/photo-1507643179773-3e975d7ac515?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0JTIwZ2FsbGVyeXxlbnwwfHwwfHx8MA%3D%3D", isOnline } = user || {};

  return (
    <div className="flex px-3 items-center justify-between  py-2 rounded-t">
      {/* Profile Section */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          {/* Profile Picture */}
          <img
            src={profilePic || "./src/assets/default-profile.png"}
            alt={`${name}'s profile`}
            className="w-12 h-12 rounded-full object-cover border border-gray-300"
          />
          {/* Online/Offline Indicator */}
          <div
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${isOnline ? 'bg-green-600' : 'bg-gray-400'
              }`}
            title={isOnline ? "Online" : "Offline"}
          ></div>
        </div>
        {/* User Info */}
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-800">
            {name.length > 19 ? `${name.slice(0, 21)}...` : name}
          </span>
          <span
            className={`text-sm ${isOnline ? 'text-green-600' : 'text-gray-500'
              }`}
          >
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      {/* Placeholder for additional content (e.g., Logout button) */}
      <div className="text-2xl cursor-pointer hover:underline">
        <MdFullscreenExit />
      </div>
    </div>
  );
};

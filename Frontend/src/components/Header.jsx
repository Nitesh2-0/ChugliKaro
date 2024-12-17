import React from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { useChatStore } from './../store/useChatStore';
import userProfile from "../assets/chats.png";

export const Header = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  if (!selectedUser) {
    return null;
  }

  const isOnline = selectedUser.isOnline;

  return (
    <div className="flex px-3 items-center justify-between py-2 rounded-t">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img
            src={selectedUser.profilePic || userProfile}
            alt={`${selectedUser._id}'s profile`}
            className="w-12 h-12 rounded-full object-cover border border-gray-300"
          />
          <div
            className={`absolute hidden bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${isOnline ? 'bg-green-600' : 'bg-gray-400'}`}
            title={isOnline ? "Online" : "Offline"}
          ></div>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-800">
            {selectedUser.fullName.length > 19 ? `${selectedUser.fullName.slice(0, 21)}...` : selectedUser.fullName}
          </span>
          <div className='flex items-center'>
            <span className={`text-sm ${isOnline ? 'text-green-600' : 'text-gray-500'}`}>
              {isOnline ? "Online" : "Offline"}
            </span>
            <spna className="text-sm text-gray-500"> ▪️ {selectedUser.email}</spna>
          </div>
        </div>
      </div>

      <div className="text-2xl cursor-pointer hover:underline">
        <IoCloseSharp onClick={() => setSelectedUser(null)} />
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';

const Sidebar = () => {
  const { users, getUsers } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);


  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users
    .filter((user) => Object.keys(user).length > 0)
    .filter(
      (user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="h-[calc(100vh-8vh)] overflow-y-auto w-full px-6 md:px-12 py-4 md:w-96">
      {/* Search Section */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* User List */}
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user, index) => (
          <div
            key={index}
            className="w-full px-2 mb-2 md:border md:rounded hover:bg-gray-100 md:px-3 py-2 flex items-center justify-between space-x-2"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={user.profilePic || "./src/assets/chats.png"}
                  alt={user.name || "User"}
                  className="w-12 h-12 border-gray-100 border rounded-full object-cover"
                />
                <div
                  className={`w-3 h-3 border border-white ${
                    !user.isOnline ? 'bg-green-600' : 'bg-gray-300'
                  } rounded-full absolute bottom-0 right-0`}
                ></div>
              </div>

              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-700">
                  {user.name?.length > 15
                    ? `${user.name.slice(0, 15)}...`
                    : user.fullName || 'Unknown'}
                </span>
                <span className="text-sm text-gray-500">
                  {user.email?.length > 20
                    ? `${user.email.slice(0, 20)}...`
                    : user.email || 'Unknown'}
                </span>
              </div>
            </div>

            {/* {user.messageCount && ( */}
              <p className="px-2 text-sm rounded-full text-white bg-green-500">
                {/* {user.messageCount} */}5
              </p>
            {/* )} */}
          </div>
        ))
      ) : (
        <div className="text-gray-500 text-center py-4">No users found</div>
      )}
    </div>
  );
};

export default Sidebar;

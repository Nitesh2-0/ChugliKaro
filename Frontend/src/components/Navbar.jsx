import React from 'react';
import { FiSettings } from 'react-icons/fi';
import { BiLogOut } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { useAuthStore } from '../store/useAuthStore';
import ProfilePage from '../pages/ProfilePage';
import avtar from '../assets/chats.png';
import { MdDarkMode } from "react-icons/md";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const { logout , authUser} = useAuthStore();
  
  const handleLogout = () => {
    logout();
  }

  return (
    <>
      <div className="w-screen flex items-center bg-gray-50 px-4 md:px-8 lg:px-12 py-3 md:py-2 shadow-md justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img
            src="./src/assets/chats.png"
            alt="Logo"
            className="h-10 w-10 object-cover border-gray-100 border rounded-full"
          />
          <span className="text-lg font-bold text-gray-700 uppercase">Informer</span>
        </div>

        {/* Action Buttons Section */}
        <div className="flex items-center space-x-8">
          <button
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition duration-200 ease-in-out"
            title="Settings"
          >
            <MdDarkMode className='text-xl' />
            <span className="hidden sm:inline-block">Mode</span>
          </button>

          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 hover:text-gray-800 transition duration-200 ease-in-out"
          >
            <img src={ authUser?.profilePic || avtar} alt="" className='w-7 h-7 object-cover border-gray-100 border rounded-full' />
            <span className="hidden sm:inline-block text-gray-700">Profile</span>
          </button>

          <button
            className="hidden md:flex items-center space-x-1 text-red-500 hover:text-red-700 transition duration-200 ease-in-out"
            title="Logout"
            onClick={handleLogout}
          >
            <BiLogOut className="text-xl" />
            <span className="hidden sm:inline-block">Logout</span>
          </button>
        </div>
      </div>

      {/* Profile Dropdown with Transition */}
      <div className={`absolute top-16  md:right-2 transition-all duration-300 ease-in-out transform ${isProfileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {isProfileOpen && <ProfilePage />}
      </div>
    </>
  );
};

export default Navbar;

import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import { FaUserEdit } from "react-icons/fa";
import avatar from "../assets/chats.png";
import { BiLogOut } from "react-icons/bi";

const ProfilePage = () => {
  const { authUser,logout, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [fullName, setFullName] = useState(authUser?.fullName || "");
  const [email, setEmail] = useState(authUser?.email || "");
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  console.log(JSON.stringify(authUser) + " wsdcjns");


  useEffect(() => {
    if (authUser) {
      setFullName(authUser?.fullName || "");
      setEmail(authUser?.email || "");
    }
  }, [authUser]);

  useEffect(() => {
    setIsFormValid(fullName.trim() !== "" && email.trim() !== "");
  }, [fullName, email]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      try {
        await updateProfile({ profilePic: base64Image });
      } catch (error) {
        setError("Failed to update profile picture");
      }
    };
  };

  const handleFullNameChange = (e) => {
    const newFullName = e.target.value;
    setFullName(newFullName);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  const handleSave = async () => {
    try {
      setError("");
    } catch (error) {
      setError("Failed to update profile");
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-screen md:w-96 border-t md:border-t-0 flex items-center z-50 justify-center">
      <div className="w-full h-screen md:h-auto md:border-t-2 z-50 border-yellow-400 bg-gray-50 md:rounded-lg md:shadow-md overflow-hidden">
        <div className="p-4 w-full">
          <div className="text-center mb-6 relative">
            <h1 className="text-xl font-semibold text-gray-800 uppercase"> MY Profile</h1>
            {/* Updated icon with new position */}
            <div className="absolute flex justify-between w-full text-2xl top-0 left-0">
              <div className="hidden items-center flex-col">
                <FaUserEdit className="border rounded-full text-blue-600 p-1 cursor-pointer" />
                <span className="text-blue-600 -mt-2 text-[9px] font-extralight">Edit Profile</span>
              </div>
              <div className="flex md:hidden items-center flex-col">
                <BiLogOut onClick={handleLogout} className="border rounded-full p-1 text-red-600 cursor-pointer" />
                <span className="text-red-600 -mt-2 text-[9px] font-extralight">Logout</span>
              </div>
            </div>

          </div>

          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profilePic || avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-md"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-500 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "opacity-50 pointer-events-none" : ""
                  }`}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              {isUpdatingProfile ? "Uploading..." : "Tap the camera icon to change your photo"}
            </p>
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </div>

          {/* Profile Information Section */}
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" /> Full Name
              </div>
              <input
                type="text"
                value={fullName}
                onChange={handleFullNameChange}
                className="px-4 py-2 bg-gray-50 rounded-md border border-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={true}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-1">
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" /> Email Address
              </div>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="px-4 py-2 bg-gray-50 rounded-md border border-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={true}
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Account Information Section */}
          <div className="mt-6 bg-gray-100 border-b-2 border-green-500 rounded-lg p-4 shadow-inner">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Account Information</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0].split("-").reverse().join("/") || "Unknown"}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500 font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

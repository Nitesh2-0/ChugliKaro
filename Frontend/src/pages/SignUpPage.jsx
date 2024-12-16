import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { FaUserAlt, FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { MdArrowForward } from "react-icons/md";
import chats from "../assets/chats.png";
import register from "../assets/register.png";
import { Loader2 } from "lucide-react";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = React.useState({});
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email address.";
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required.";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) signup(formData);
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-50">
      <div className="hidden md:flex flex-col rounded-r-3xl justify-cente items-center bg-gradient-to-r from-[#4176D1] to-[#6996DF] text-white p-10 shadow-lg">
        <h1 className="text-4xl font-extrabold mb-4 animate-fade-in">Welcome Back!</h1>
        <p className="text-lg text-center opacity-90">
          Join us today and experience the best services tailored for your needs.
        </p>
        <img src={register} alt="Chat illustration" className="mt-6 w-2/3 animate-bounce-slow" />
      </div>

      <div className="flex justify-center items-center p-8 shadow-md rounded-lg">
        <div className="w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-6" disabled={isSigningUp}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`pl-10 mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all ${errors.fullName ? "border-red-500" : "border-gray-300"
                    }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && (
                <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`pl-10 mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all ${errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  placeholder="example@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`pl-10 mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all ${errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  placeholder="******"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-500 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  className={`pl-10 mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                    }`}
                  placeholder="******"
                />
                <button
                  disabled={isSigningUp}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-500 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSigningUp}
                className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 transition-transform transform hover:scale-105"
              >
                {isSigningUp ?
                  <>
                    <Loader2 className="animate-spin size-5" />
                    Loading...
                  </> : "Create Account"}
              </button>
            </div>
            <p className="text-sm flex items-center gap-1 text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="text-indigo-500 hover:underline transition-all flex items-center">
                Login
                <MdArrowForward className="ml-1" />
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

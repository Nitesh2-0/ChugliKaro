import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { MdArrowForward } from "react-icons/md";
import login2 from "../assets/Login (1).png";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({});
  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email address.";
    if (!formData.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) login(formData);
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-50">
      <div className="hidden md:flex flex-col rounded-r-3xl justify-center items-center bg-gradient-to-r from-[#D7860E] to-[#D7860E] text-white p-10 shadow-lg">
        <h1 className="text-4xl font-extrabold mb-4 animate-fade-in">Welcome Back!</h1>
        <p className="text-lg text-center opacity-90">
          Login to access your account and manage your tasks seamlessly.
        </p>
        <img src={login2} alt="Chat illustration" className="mt-6 w-2/3 animate-bounce-slow" />
      </div>

      <div className="flex justify-center items-center p-8 shadow-md rounded-lg">
        <div className="w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6" disabled={isLoggingIn}>
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
                  className={`pl-10 mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all ${errors.email ? "border-red-500" : "border-gray-300"}`}
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
                  className={`pl-10 mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all ${errors.password ? "border-red-500" : "border-gray-300"}`}
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
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-[#D7860E] hover:bg-[#d7870ef0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D7860E] disabled:bg-[#D7860E] transition-transform transform hover:scale-105"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="animate-spin size-5" />
                    Loading...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
            <p className="text-sm flex items-center gap-1 text-gray-500">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-indigo-500 hover:underline transition-all flex items-center"
              >
                Sign Up
                <MdArrowForward className="ml-1" />
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

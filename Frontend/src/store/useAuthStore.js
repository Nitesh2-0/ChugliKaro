import { create } from "zustand";
import axiosInstance from "../util/axios";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  // State Variables
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  // Methods
  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data.user });
    } catch (error) {
      console.error("Error in checkAuth store:", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      set({ isSigningUp: true });
      const response = await axiosInstance.post("/auth/signup", data);
      toast.success(response.data.message || "Account created successfully");
      set({ authUser: response.data });
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed";
      toast.error(message);
      console.error("Error in signup store:", error.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLoggingIn: true });
      const response = await axiosInstance.post("/auth/login", data);
      toast.success(response.data.message || "Login successful");
      set({ authUser: response.data });
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      console.error("Error in login store:", error.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.get("/auth/logout");
      set({ authUser: null });
      toast.success(response.data.message || "Logout successful");
    } catch (error) {
      const message = error.response?.data?.message || "Logout failed";
      toast.error(message);
      console.error("Error in logout store:", error.message);
    }
  },

  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true });
      const response = await axiosInstance.put("/auth/update-profile", data);
      toast.success(response.data.message || "Profile updated successfully");
      set({ authUser: response.data });
    } catch (error) {
      const message = error.response?.data?.message || "Profile update failed";
      toast.error(message);
      console.error("Error in updateProfile store:", error.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

}));

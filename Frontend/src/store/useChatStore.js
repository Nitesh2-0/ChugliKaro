import { create } from "zustand";
import axiosInstance from "../util/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set) => ({
  message: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    try {
      set({ isUsersLoading: true });
      const response = await axiosInstance.get("/message/users");
      set({ users: response.data.users });
    } catch (error) {
      console.error("Error in getUsers store:", error.message);
      toast.error(error.response?.data?.message || "Failed to get users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    try {
      set({ isMessagesLoading: true });
      const response = await axiosInstance.get("/chat/messages");
      set({ message: response.data.messages });
    } catch (error) {
      console.error("Error in getMessages store:", error.message);
      toast.error(error.response?.data?.message || "Failed to get messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  }

}));
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://chat-room-api-tau.vercel.app/api/chat",
  // withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;

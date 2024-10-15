import { io, Socket } from "socket.io-client";

const socketClient: Socket = io("https://chat-room-api-tau.vercel.app", {
  // withCredentials: true,
  transports: ["polling"],
});

export default socketClient;

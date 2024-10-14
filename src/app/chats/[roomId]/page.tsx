"use client";
import Message from "@/components/Message";
import MessageInput from "@/components/MessageInput";
import TopBar from "@/components/Topbar";
import apiClient from "@/global/apiClient";
import socketClient from "@/global/socketClient";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ChatRoom: React.FC = () => {
  const router = useRouter();
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await apiClient.get(`/messages/${roomId}`);
        setMessages(response.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        toast.error("Failed to fetch messages");
      }
    };

    fetchMessages();
  }, [roomId]);

  useEffect(() => {
    socketClient.emit("join", { name: "User", roomId });

    socketClient.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketClient.off("message");
    };
  }, [roomId]);

  const handleLogout = () => {
    router.push("/");
    toast.success("User logged out");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800 text-white">
      <TopBar roomId={roomId} onLogout={handleLogout} />
      <div className="flex-1 overflow-auto p-4">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
      </div>
      <MessageInput roomId={roomId} />
    </div>
  );
};

export default ChatRoom;

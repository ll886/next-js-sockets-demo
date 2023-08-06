"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

function Page() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();

  useEffect(() => {
    socket = io("http://localhost:3001");
    socket.emit("joinRoom", roomId);

    socket.on("sendMessage", (roomId, message) => {
      console.log(`client received room${roomId} message: ${message}`);
      setMessages((data) => [...data, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  function sendMessage(e) {
    e.preventDefault();
    console.log(`Sent roomId: ${roomId}, message: ${message}`);
    socket.emit("sendMessage", roomId, message);
    setMessage("");
  }

  return (
    <div>
      <h1>Chat {roomId}</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}

        <form onSubmit={sendMessage}>
          <input
            name="message"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete={"off"}
          />
        </form>
      </div>
    </div>
  );
}

export default Page;

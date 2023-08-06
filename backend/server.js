const express = require("express");
const app = express();
app.use(require("cors")());
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const port = 3001;
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("sendMessage", (roomId, message) => {
    console.log(`Received room${roomId} message: ${message}`);
    io.to(roomId).emit("sendMessage", roomId, message);
  });
});

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

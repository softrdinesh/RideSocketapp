// server.js
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const { Users } = require("./Users");
let users = new Users();
let locations = null;
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join", (location) => {
    socket.join(location.orderId);
    users.addUser(socket.id, location.riderId, location.orderId);
    locations = location;
    io.to(location.orderId).emit(
      "updateUsersList",
      users.getUserList(location.orderId)
    );
    io.emit("locationUpdate", locations);

    // socket.broadcast.to(locations.orderId).emit("locationUpdate", locations);
  });

  socket.on("disconnect", () => {
    // console.log("User disconnected");
    // console.log("socket.id server.js->", socket.id);
    // console.log("users server.js->", users);
    let user = users.removeUser(socket.id);
    if (user) {
      io.to(user.orderId).emit(
        "updateUsersList",
        users.getUserList(user.orderId)
      );
      io.to(user.orderId).emit("locationUpdate", locations);
    }
  });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

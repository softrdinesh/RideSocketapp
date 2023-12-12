// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
io.on('connection', (socket) => {
console.log('A user connected');
socket.on('locationUpdate', (location) => {
// Broadcast the location to all connected clients
io.emit('locationUpdate', location);
});
socket.on('disconnect', () => {
console.log('User disconnected');
});
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});



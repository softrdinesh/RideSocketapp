// server.js
// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);
// io.on('connection', (socket) => {
// console.log('A user connected');
// socket.on('locationUpdate', (location) => {
// // Broadcast the location to all connected clients
// io.emit('locationUpdate', location);
// });
// socket.on('disconnect', () => {
// console.log('User disconnected');
// });
// });
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
// console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const orderCustomerMap = {}; // Map to store the association between order ID and

io.on('connection', (socket) => {
console.log('User connected');
// Handle customer authentication
socket.on('authenticateCustomer', (data) => {
// Associate customer's socket ID with order ID
orderCustomerMap[data.orderId] = socket.id;
console.log(`Customer ${data.customerId} authenticated for Order
${data.orderId}`);
});
// Handle rider authentication
socket.on('authenticateRider', (data) => {
// Associate rider's socket ID with order ID
orderCustomerMap[data.orderId] = socket.id;
console.log(`Rider ${data.riderId} authenticated for Order ${data.orderId}`);
});
// Handle location updates from the rider app
socket.on('updateLocation', (data) => {
// Broadcast the location to the specific customer based on the order ID
const customerSocketId = orderCustomerMap[data.orderId];
io.to(customerSocketId).emit('locationUpdate', { riderId: data.riderId, location:
data.location });
});
socket.on('disconnect', () => {
console.log('User disconnected');
});
});
server.listen(3000, () => {
    console.log('Server is running on port 3000');
    });


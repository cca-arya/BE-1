Name - Arya Shidore
Reg no - 20BCE2027
College - VIT Vellore


Hirequotient Assignment 

Github repo - https://github.com/cca-arya/BE-1
Video Demo - 



Project Overview:
The project is a real-time chat application built using Node.js, Express.js, MongoDB, and Socket.io. It allows users to register, login, and chat with each other in real-time.

Components:
1) Authentication:
Users can register with an email and password.
JWT (JSON Web Tokens) are used for managing authentication.

2) Chat Functionality:
Users can send and receive real-time messages.
Socket.io is used for efficient real-time communication between clients and the server.
Message Storage:

All messages are stored in MongoDB.
Messages are retrievable for conversation between users.
User Online Status:

Users can set their status as 'AVAILABLE' or 'BUSY'.
Socket.io is used to handle online status and real-time updates.
Socket.io:
Server-side (Node.js):

3) Socket.io is initialized on the server using const io = new Server(server).
It handles client connections and disconnections with io.on('connection', (socket) => { ... }).
The server emits messages to specific clients or all clients using socket.emit() or io.emit().
Client-side (Frontend):

4) Clients connect to the server using const socket = io().
They can send messages to the server or listen for incoming messages using socket.emit() and socket.on() respectively.
CORS (Cross-Origin Resource Sharing):
Purpose: CORS is a security feature that controls access to resources from different origins.
Implementation: In this project, CORS is configured to allow requests from all origins ('*') using cors: { origin: '*' } in the Socket.io server initialization. This allows the client-side application to communicate with the server.
In summary, the project implements a real-time chat system with user authentication, message storage, and online status functionality using Socket.io for real-time communication and CORS for allowing cross-origin requests.






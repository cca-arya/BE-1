const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// middleware
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

app.use((req, res, next) => {
  req.io = io;
  next();
});

// connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chat-app', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to MongoDB');
}
).catch((error) => {
  console.log('Error: ', error);
}
);


// socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('join', (userId) => {
    socket.join(userId);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


// start the server
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

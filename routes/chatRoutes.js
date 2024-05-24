const express = require('express');
const { sendMessage, getMessages } = require('../controllers/chatController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// Send a message to a user
router.post('/send', authMiddleware, sendMessage);
// Get all messages between the user and a recipient
router.get('/messages/:recipientId', authMiddleware, getMessages);

module.exports = router;

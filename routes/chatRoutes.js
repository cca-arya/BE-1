const express = require('express');
const { sendMessage, getMessages } = require('../controllers/chatController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/send', authMiddleware, sendMessage);
router.get('/messages/:recipientId', authMiddleware, getMessages);

module.exports = router;

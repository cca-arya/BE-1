const Message = require('../models/Message');
const User = require('../models/User');
const { getLLMResponse } = require('../utils/llmService');

// Send a message to a user
exports.sendMessage = async (req, res) => {
  const { recipientId, content } = req.body;
  const senderId = req.userId;
  
  try {
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }
    
    let responseContent = content;
    if (recipient.status === 'BUSY') {
      const llmResponse = await Promise.race([
        getLLMResponse(content),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 10000))
      ]).catch(() => 'The user is currently busy. Please try again later.');
      responseContent = llmResponse;
    }

    const message = new Message({ sender: senderId, recipient: recipientId, content: responseContent });
    await message.save();

    // Emit the message to both sender and recipient
    req.io.to(senderId.toString()).emit('message', message);
    req.io.to(recipientId.toString()).emit('message', message);

    res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all messages between the user and a recipient
exports.getMessages = async (req, res) => {
  const { userId } = req;
  const { recipientId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, recipient: recipientId },
        { sender: recipientId, recipient: userId }
      ]
    }).sort('timestamp');

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

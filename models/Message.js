const mongoose = require('mongoose');

// message schema
// field sender: ObjectId of the user who sent the message
// field recipient: ObjectId of the user who received the message
// field content: message content
// field timestamp: message timestamp


const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);

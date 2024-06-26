const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// user schema
// field email: user email
// field password: user password
// field status: user status (AVAILABLE or BUSY)

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, enum: ['AVAILABLE', 'BUSY'], default: 'AVAILABLE' },
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

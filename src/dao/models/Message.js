import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  user: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;

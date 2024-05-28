const Message = require('../models/Message');

class MessageManager {
    async addMessage(user, message) {
        const newMessage = new Message({ user, message });
        return await newMessage.save();
    }

    async getMessages() {
        return await Message.find();
    }
}

module.exports = new MessageManager();
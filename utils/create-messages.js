const formatTime = require('date-format');

const createMessages = (messagesText, username, userId) => {
    return {
        messagesText,
        createAt: formatTime("dd/MM/yyyy - hh:mm:ss", new Date()),
        username,
        userId,
    }
}

module.exports = {
    createMessages,
}
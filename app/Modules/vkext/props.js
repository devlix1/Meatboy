module.exports = class VkProps extends require('./photo') {
    send(text, msg, options) {
        const data = {};

        this.call('messages.send', {peer_id: msg.peer, message: text});
    }
};
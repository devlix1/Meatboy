module.exports = class VkProps {
    send(text, msg) {
        this.call('messages.send', {peer_id: msg.msgpeer, message: text});
    }
};
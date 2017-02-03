module.exports = class VkProps extends require('./photo') {
    send(text, msg, options) {
        const data = {};

        if (typeof msg === 'object')
            data.id = msg.msgpeer;
        else
            data.id = msg;

        this.call('messages.send', {peer_id: data.id, message: text});
    }
};
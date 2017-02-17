module.exports = class VkProps extends require('./photo') {
    send(text, msg, options) {
        const data = {};

        const filter = text.replace(/(https?:\/\/|)[\wА-я1-9]+\.\w{1,10}/g, data => {
            return '';
        });

        this.call('messages.send', {peer_id: msg.msgpeer, message: filter});
    }
};
module.exports = class VkProps extends require('./photo') {
    send(text, object) {
        const options = {};
        const msg = object.msg;

        options['message'] = text.replace(/(https?:\/\/|)[\wА-я1-9]+\.\w{1,10}/g, data => {
            return '';
        });

        options['peer_id'] = object.peer_id || msg.msgpeer;
        options['forward_messages'] = object.forward || '';

        this.call('messages.send', options);
    }
};
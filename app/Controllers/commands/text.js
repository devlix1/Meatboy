module.exports = class Text {
    handler(data) {
        this.msg = data.msg;
        this.api = data.api;

        if(this.msg.msgtext.search(/снег/) >= 0) {
            this.api.call('messages.send', {peer_id: this.msg.msgpeer, message: 'Снег уебан'});
        }
    }
};
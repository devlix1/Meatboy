module.exports = class Text {
    handler(data) {
        this.msg = data.msg;
        this.api = data.api;

        if(this.msg.msgtext.search(/снег/) >= 0) {
            this.api.send('снег уебан', this.msg);
        }
    }
};
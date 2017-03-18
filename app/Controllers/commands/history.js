module.exports = class Text {
    constructor() {
        
    }

    handler(data, advance) {
        this.msg = data.msg;
        this.api = data.api;
        this.models = data.models;
        
        const model = this.models.usercache.setModules(this.api, this.msg);

        model.getUser(this.msg.msgsender).then(data => {
            advance.socket.emit('event', {event: 'onMessage', data: {
                msg: this.msg, 
                profile: data
            }});
        });
    }
};
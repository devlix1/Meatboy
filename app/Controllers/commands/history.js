module.exports = class Text {
    constructor() {
        
    }

    handler(data, type) {
        this.msg = data.msg;
        this.api = data.api;
        this.models = data.models;
        
        const model = this.models.userinfo.setModules(this.api, this.msg);

        if (type === 'cmd') {
            this.api.call('users.get', {user_ids: this.msg.cmdtext}).then(data => {
                if (data)
                    this.send(model.get(data[0].id));
            });
        } else {
            if (!model.get(this.msg.msgsender))
                model.set(this.msg.msgsender).then(profile => {});
            else
                model.setLastMessage(this.msg.msgsender);
        }
    }

    send(data) {
        const user = data || {};

        const string = [
            'Имя: ' + user.first_name + ' ' + user.last_name,
            'ID: ' + user.id,
            'Домен: ' + user.domain,
            'Последнее сообщение: ' + new Date(user.message.ts * 1000).toLocaleString(),
            'Содержание: (' + user.message.dialog.name + ') ' +  user.message.text
        ];

        this.api.send(string.join('\n'), {msg: this.msg});
    }
};
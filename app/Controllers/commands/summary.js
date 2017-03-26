module.exports = class Summary {
    constructor() {
        this.alias = 'итоги/итог';
        this.cmd = true;
    }


    handler(data) {
        this.msg = data.msg;
        this.api = data.api;
        
        this.api.call('messages.getChat', {chat_id: data.msg.msgpeer - 2e9, fields: 'nickname'}).then(data => {
            const users = data.users;

            this.api.send(this.template().replace(/\{name\}/g, value => {
                return this.api.stuff.randomArray(users).last_name;
            }), {msg: this.msg});
        });
    }

    template() {
        const string = [
            '{name} - отсосал у дауна с фамилией {name}',
            '{name} пидар))',
            '{name} уебан',
            '{name} норм сосёт',
            '{name} делает губнуху',
            '{name} топ тян конфы',
            'игрок {name} убил игрока {name} с помощью своего хуя',
            '{name} сосёт в танках',
            '{name} не продали сигареты',
            'батя {name} отсосал хуй у бати {name}',
            '{name} и {name} ебутся в жёпку'
        ];
        
        return string.join('\n');
    }
};

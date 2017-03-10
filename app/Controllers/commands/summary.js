module.exports = class Text {
    handler(data) {
        this.msg = data.msg;
        this.api = data.api;
        
        this.api.call('messages.getChat', {chat_id: data.msg.msgpeer - 2e9, fields: 'nickname'}).then(data => {
            const users = data.users;

            this.api.send(this.template().replace(/\{name\}/g, value => {
                return this.api.stuff.randomArray(users).first_name;
            }), {msg: this.msg});
        });
    }

    template() {
        const string = [
            '{name} - отсосал у дауна с именем {name}',
            '{name} пидар))',
            '{name} уебан',
            '{name} норм сосёт',
            '{name} делает губнуху',
            '{name} топ тян конфы',
            'игрок {name} убил игрока {name} с помощью своего хуя',
            '{name} сосёт в танках',
            '{name} не продали сигареты',
            'батя {name} отсосал хуй у бати {name}',
            '{name} и {name} ебутся в жёпку',
            'Мать {name}a ебучая шлюха, этим воспользовался {name} и засадил этой суке в жёпку, сею картину наблюдал {name}, ему стало завистно и он тоже хотел подключиться к ебле, но тут выскакивает {name} со своим хуём и уничтожает {name}. На другом берегу тихонько сосёт хуй некий {name}, который является рабом {name}. Ну сосёт он хуй и думает о мамаше {name}. Его хозяин узнал про это и ударил своей елдой в виде {name} ему по ебалу, ну а тот и сдох. Его анальный дружок {name} пришел на его похороны и выебал бабку {name}a. The End.'
        ];
        
        return string.join('\n');
    }
};

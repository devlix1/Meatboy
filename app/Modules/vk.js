module.exports = class Vk extends require('./vkext/props') {
    constructor() {
        super();

        this.request = require('./http');
        this.stuff = require('./stuff');
        this.uri = ['https://api.vk.com/method/', 'https://oauth.vk.com/token'];
        this.prefix = '[Modules/VK]';
    }

    entry(username, password) {
        return new Promise(resolve => {
            this.request.post(this.uri[1], this.entryObject(username, password)).then(data => {
                data = this.errors(data);

                this.profile = {token: data.access_token, user_id: data.user_id};
                
                resolve(this);
                console.log(this.prefix, 'Хорошо авторизировались, да!');
            });
        }).catch(e => {throw new Error(e)});
    }

    call(name, options = {}) {
        const customOptions = ['token', 'ver', 'method'];

        const requestOptions = Object.assign({
            access_token: options.token === false ? '' : this.profile.token,
            v: options.ver === false ? '' : '5.62',
        }, options);

        const url = name.indexOf('http') >= 0 ? name : this.uri[0] + name;
        const method = options.method || 'POST';

        customOptions.forEach(value => {
            if (Object.getOwnPropertyNames(requestOptions, value))
                delete requestOptions[value];
        });

        return new Promise((resolve, reject) => {
            this.request[method.toLowerCase()](url, requestOptions).then(data => {
                resolve(this.errors(data));
            }).catch(reject);
        });
    }

    errors(data) {
        try {
            data = JSON.parse(data);

            if (data.error) {
                console.log(this.prefix, 'Ошибочка, еба', JSON.stringify(data.error));
                return false;
            }
            
            return data.response ? data.response : data;
        } catch (e) {
            console.log(this.prefix, 'Вк пизданулся и ответил в html', data);
            return false;
        }
    }

    entryObject(username, password) {
        return {
            grant_type: 'password',
            client_secret: 'hHbZxrka2uZ6jB1inYsH',
            client_id: 2274003,
            username,
            password
        };
    }
};
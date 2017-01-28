module.exports = class Bot {
    constructor(setting) {
        this.setting = setting;
        this.longPoll = {};
        this.api = require('../Modules/vk');

        return new Promise(resolve => {
            new this.api().entry(setting.Bot.username, setting.Bot.password).then(data => {
                this.api = data;

                resolve(this);
                this.getLongPoll();
            });
        });
    }

    getLongPoll() {
        this.api.call('messages.getLongPollServer', {ver: false}).then(data => {
            this.longPoll = data;
            this.longPoll.url = 'https://' + this.longPoll.server;

            this.callLongPoll(data.ts);
        });
    }

    callLongPoll(ts) {
        this.api.call(this.longPoll.url, this.setLongPollObject(ts)).then(data => {
            this.parseResponse(data);

            data.failed ? this.getLongPoll() : this.callLongPoll(data.ts);
        }).catch(this.getLongPoll);
    }

    parseResponse(data) {
        console.log(data);
    }

    setLongPollObject(ts) {
        return {
            act: 'a_check',
            key: this.longPoll.key.substr(0, this.longPoll.key.length - 10),
            ts: ts,
            wait: 25,
            mode: 2,
            method: 'GET',
            ver: false,
            token: false
        }
    }
}
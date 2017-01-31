module.exports = class Bot {
    constructor(setting) {
        this.setting = setting;
        this.socketHandler = false;

        this.longPoll = {};
        this.cmds = {};

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
        }).catch(e => {
            console.log(e);
            this.getLongPoll();
        });
    }

    parseResponse(data) {
        if (data.updates && data.updates.length > 0) {
            data.updates.forEach(value => {
                if (value[0] === 4 && value[7].from != this.api.profile.user_id) {
                    this.findCommand(this.returnMsgObject(value));
                }
            });
        }
    }

    findCommand(msg) {
        const data = {api: this.api, msg};

        if (this.cmds['ALL'])
            this.cmds['ALL'].class.handler(data);
        
        if (msg.cmdname) {
            for (let cmd in this.cmds) {
                const alias = cmd.split('/');

                if (alias.indexOf(msg.cmdname.toLowerCase()) >= 0) {
                    if (this.cmds[cmd].callback)
                        this.cmds[cmd].handler(data);
                    else
                        this.cmds[cmd].class.handler(data);
                }
            }
        }
    }

    pushCommand(alias, handler) {
        this.cmds[alias] = {};

        if (typeof handler === 'function') {
            this.cmds[alias].callback = true;
            this.cmds[alias].handler = handler;
        } else {
            this.cmds[alias].callback = false;
            this.cmds[alias].class = new (require(handler))();
        }
    }

    setSocketHandler(handler) {
        this.socketHandler = handler;
    }

    setLongPollObject(ts) {
        return {
            act: 'a_check',
            key: this.longPoll.key.substr(0, this.longPoll.key.length - 10),
            ts: ts,
            wait: 25,
            mode: 2,
            method: 'GET'
        }
    }

    returnMsgObject(data) {
        const command = data[6].match(/([!$@*\-+\/])([\d\wА-я]+)(\[.*?\]|)(.*)/);
        const msg = {
            msgcode: data[0],
            msgid: data[1],
            msgflag: data[2],
            msgpeer: data[3],
            msgts: data[4],
            msgname: data[5],
            msgtext: data[6],
            msgtextl: data[6].toLowerCase(),
            msgattach: data[7],
        };

        msg.msgdialog = msg.msgpeer > 2e9 || false;
        msg.msgsender = msg.msgpeer > 2e9 ? msg.msgattach.from : msg.msgpeer;

        if (command) {
            msg.cmdtrigger = command[1];
            msg.cmdname = command[2];
            msg.cmdargs = command[3].length > 0 ? command[3].substr(1, command[3].length - 2).split(',').map(value => value.trim()) : [];
            msg.cmdtext = command[4].trim();
        }
        
        this.socketHandler.handler('event', {event: 'onMessage', data: msg});

        console.log(`[Bot] ${msg.msgname} | ${msg.msgsender}: ${msg.msgtext}`);

        return msg;
    }
}
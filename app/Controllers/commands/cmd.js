module.exports = class Cmd {
    constructor() {
        this.alias = 'cmd/цмд';
        this.cmd = true;
    }

    handler(data) {
        this.msg = data.msg;
        this.api = data.api;

        if (data.msg.cmdtext === 'process')
            this.process();
        else
            this.cmdlog();
    }

    cmdlog() {
        let string = '';

        for (let name in this.msg) {
            string += name + ' => ' + this.msg[name] + '\n';
        }

        this.api.send(string, {msg: this.msg});
    }

    process() {
        const ts = process.uptime();

        const time = [ts / 86400 % 30, ts / 3600 % 24, ts / 60 % 60, ts % 60].map(value => {
            value = Math.floor(value);
            return value > 9 ? value : '0' + value;
        }).join(':');

        this.api.send(time, {msg: this.msg});
    }
};
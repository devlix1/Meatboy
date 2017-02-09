module.exports = class Cmd {
    handler(data) {
        this.msg = data.msg;
        this.api = data.api;

        if (data.msg.cmdtext === 'process') {
            this.process();
        } else {
            this.cmdlog();
        }
    }

    cmdlog() {
        let string = '';

        for (let name in this.msg) {
            string += name + ' => ' + this.msg[name] + '\n';
        }

        this.api.send(string, this.msg);
    }

    process() {
        this.api.send(this.tsToTime(process.uptime()), this.msg);
    }

    tsToTime(ts) {
        return [ts / 518400, ts / 21600, ts / 360, ts].map(value => {
            const c = Math.floor(value);
            return c > 9 ? c : '0' + c;
        }).join(':');
    } 
};
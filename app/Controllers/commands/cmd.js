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
        const time = new Date(1970,0,1);
        time.setSeconds(process.uptime());
        
        this.api.send(time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"), this.msg);
    }
};
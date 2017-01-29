module.exports = class Cmd {
    handler(data) {
        this.msg = data.msg;
        this.api = data.api;

        let string = '';

        for (let name in data.msg) {
            string += name + ' => ' + data.msg[name] + '\n';
        }

        data.api.send(string, data.msg);
    }
};
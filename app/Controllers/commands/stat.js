module.exports = class Stat {
    constructor() {
        this.alias = 'стат/статистика/stat';
        this.cmd = true;
    }

    handler(data) {
        this.msg = data.msg;
        this.api = data.api;
        this.models = data.models;

        this.api.send(this.models.commandst.string() + '\n\n' + this.models.commandst.word(), {msg: this.msg});
    }
};
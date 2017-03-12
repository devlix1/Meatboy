module.exports = class Cmd {
    handler(data) {
        this.msg = data.msg;
        this.api = data.api;
        this.models = data.models;

        this.api.send(this.models.commandst.string() + '\n\n' + this.models.commandst.word(), {msg: this.msg});
    }
};
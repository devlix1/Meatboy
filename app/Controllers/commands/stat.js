module.exports = class Cmd {
    handler(data) {
        this.msg = data.msg;
        this.api = data.api;
        this.models = data.models;

        this.api.send(this.models.commands.string() + '\n\n' + this.models.commands.word(), {msg: this.msg});
    }
};
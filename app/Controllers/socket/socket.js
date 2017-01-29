module.exports = class Socket {
    constructor(socket) {
        this.socket = socket;
    }

    connect() {
        this.socket.on('connection', socket => {
            this.event = socket;
        });

        return this;
    }

    handler(name, data) {
        this.event.emit(name, data);
    }

    emit() {

    }
};
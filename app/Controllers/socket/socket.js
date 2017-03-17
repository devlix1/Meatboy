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

    emit(name, data) {
        this.socket.emit(name, data);
    }

    storageEvent(data, statusMemory) {
        if (statusMemory)
            this.emit('event', {event: 'setDatabase', data});
        else
            this.emit('event', {event: 'updateDatabase', data});
    }
};
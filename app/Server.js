module.exports = class Server {
    constructor() {
        this.express = require('express');
        this.server = this.express();
        this.http = require('http').Server(this.server);
        this.socket = require('socket.io')(this.http);

        return new Promise(resolve => {
            this.http.listen(80, () => {
                resolve(this);
            });
        });
    }
};
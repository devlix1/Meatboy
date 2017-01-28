module.exports = class Server {
    constructor() {
        this.express = require('express')()
        this.http = require('http').Server(this.express);
        this.socket = require('socket.io')(this.http);

        return new Promise(resolve => {
            this.http.listen(80, () => {
                resolve(this);
            });
        });
    }
};
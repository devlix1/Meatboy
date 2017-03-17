module.exports = class {
    constructor() {
        this.memory = {};
        this.block = this.memory;
        this.nameBlock = [];
        this.lastBlock = {};

        this.watch = [];

        this.callBlock = 0;
        this.callback;

        this.memory.file = {};
        this.fs = require('fs');
        this.dir = './storage/database/';

        this.initAllFiles();
    }  

    setBlock(name) {
        if (!this.callBlock && !this.memory[name]) {
            this.memory[name] = {};

            this.lastBlock[this.callBlock] = this.memory;
            this.nameBlock.push(name);

            this.block = this.memory[name];
            this.callBlock++;

            return this;
        }

        if (!this.block[name])
            this.block[name] = {};

        this.lastBlock[this.callBlock] = this.block;
        this.nameBlock.push(name);

        this.block = this.block[name];
        this.callBlock++;

        return this;
    }

    clear() {
        this.callBlock = 0;
        this.block = this.memory;
        this.lastBlock = {};
        this.nameBlock = [];
        this.watch = [];

        return this;
    }

    unsetBlock() {
        delete this.lastBlock[this.callBlock];

        this.callBlock--;

        this.block = this.lastBlock[this.callBlock];

        delete this.lastBlock[this.callBlock];
        delete this.nameBlock[this.nameBlock.length - 1];

        return this;
    }

    set(key, value) {
        this.block[key] = value;

        return this;
    }

    delete(key) {
        delete this.block[key];

        return this;
    }

    get(key) {
        return this.block[key];
    }

    section() {
        return this.block;
    }

    watchKey(key) {
        this.watch.push(key);

        return this;
    }

    inc(num = 1) {
        this.block[this.watch[0]] = this.block[this.watch[0]] + num;

        return this;
    }

    dec(num = 1) {
        this.block[this.watch[0]] = this.block[this.watch[0]] - num;

        return this;
    }

    data() {
        return this.block[this.watch[0]];
    }

    initAllFiles() {
        const data = this.fs.readdirSync(this.dir);

        if (data) {
            data.forEach(file => {
                const name = file.split('.')[0];
                const text = require('../.' + this.dir + file);

                this.memory.file[name] = text;
            });
        }
    }

    setDatabaseFile(block, options) {
        if (options.event) {
            // Обещаю, сделаю, возможно....
        }

        if (options.interval) {
            setInterval(() => {
                this.fs.writeFile(this.dir + block + '.json', JSON.stringify(this.memory.file[block] || {}), error => {
                    if (error) console.log(error);
                });
            }, options.interval * 1000);
        }
    }

    event(getMemory) {
        if (this.callback)
            this.callback(this.memory, getMemory || null);
    }

    setEventCallback(callback) {
        this.callback = callback;

        this.event(true)
    }
};
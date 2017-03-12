module.exports = class {
    constructor() {
        this.memory = {};
        this.block = this.memory;
        this.lastBlock = {};

        this.watch = [];

        this.callBlock = 0;
        this.callback;
    }  

    setBlock(name) {
        if (!this.callBlock && !this.memory[name]) {
            this.memory[name] = {};

            this.lastBlock[this.callBlock] = this.memory;

            this.block = this.memory[name];
            this.callBlock++;

            return this;
        }

        if (!this.block[name])
            this.block[name] = {};

        this.lastBlock[this.callBlock] = this.block;

        this.block = this.block[name];
        this.callBlock++;

        return this;
    }

    clear() {
        this.callBlock = 0;
        this.block = this.memory;
        this.lastBlock = {};
        this.watch = [];

        return this;
    }

    unsetBlock() {
        delete this.lastBlock[this.callBlock];

        this.callBlock--;

        this.block = this.lastBlock[this.callBlock];

        delete this.lastBlock[this.callBlock];

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

    event(getMemory) {
        if (this.callback)
            this.callback(this.memory, getMemory || null);
    }

    setEventCallback(callback) {
        this.callback = callback;

        this.event(true)
    }
};
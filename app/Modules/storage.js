module.exports = class {
    constructor() {
        this.memory = {}; 
        this.sections = [];

        this.callback;
    }

    push(name, value, section = null) {
        if (section && !this.memory[section])
            this.memory[section] = {};

        section ? this.memory[section][name] = value : this.memory[name] = value;

        this.event();

        return this;
    }

    delete(name, section = null) {
        section ? delete this.memory[section][name] : delete this.memory[name];

        this.event();

        return this;
    }

    get(name, section = null) {
        if (section && !this.memory[section])
            this.memory[section] = {};

        return section ? this.memory[section][name] : this.memory[name];
    }

    section(name) {
        return this.memory[name];
    }

    watch(name, section = null) {
        this.element = {name, section};

        return this;
    }

    inc(num = 1) {
        if (this.element) {
            const el = this.element;
            const value = el.section ? this.memory[el.section][el.name] : this.memory[el.name];

            el.section ? this.memory[el.section][el.name] = value + num : this.memory[el.name] = value + num;

            this.event();
        }

        return this;
    }

    dec(num = 1) {
        if (this.element) {
            const el = this.element;
            const value = el.section ? this.memory[el.section][el.name] : this.memory[el.name];

            el.section ? this.memory[el.section][el.name] = value - num : this.memory[el.name] = value - num;

            this.event();
        }

        return this;
    }

    data() {
        const el = this.element;

        return el.section ? this.memory[el.section][el.name] : this.memory[el.name];
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
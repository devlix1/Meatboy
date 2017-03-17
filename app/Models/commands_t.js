module.exports = class {
    constructor(db) {
        this.db = db;
    }

    add(trigger) {
        const local = this.db.setBlock('file').setBlock('groups').setBlock('triggers');

        if (!local.get(trigger))
            local.set(trigger, 0);

        local.watchKey(trigger).inc().clear();
    }

    string() {
        const triggers = this.db.setBlock('file').setBlock('groups').setBlock('triggers').section();
        const string = [];

        for (let i in triggers) {
            string.push('Триггер ' + i + ' использован ' + triggers[i] + ' раз.');
        }

        this.db.clear();

        return string.join('\n');
    }

    addWord(word) {
        const local = this.db.setBlock('file').setBlock('groups').setBlock('words');

        if (!local.get(word))
            local.set(word, 0);

        local.watchKey(word).inc().clear();
    }

    word() {
        const words = this.db.setBlock('file').setBlock('groups').setBlock('words').section();
        const string = [];

        for (let i in words) {
            string.push('Триггер ' + i + ' использован ' + words[i] + ' раз.');
        }

        this.db.clear();

        return string.join('\n');
    }
};
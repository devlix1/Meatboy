module.exports = class {
    constructor(db) {
        this.db = db;
    }

    add(trigger) {
        if (!this.db.get(trigger, 'triggers_group'))
            this.db.push(trigger, 0, 'triggers_group');

        this.db.watch(trigger, 'triggers_group').inc();
    }

    addWord(word) {
        if (!this.db.get(word, 'word_group'))
            this.db.push(word, 0, 'word_group');

        this.db.watch(word, 'word_group').inc();
    }

    string() {
        const triggers = this.db.section('triggers_group');
        const string = [];

        for (let i in triggers) {
            string.push('Триггер ' + i + ' использован ' + triggers[i] + ' раз.');
        }

        return string.join('\n');
    }

    word() {
        const words = this.db.section('word_group');
        const string = [];

        for (let i in words) {
            string.push('Слово ' + i + ' использовано ' + words[i] + ' раз.');
        }

        return string.join('\n');
    }
};
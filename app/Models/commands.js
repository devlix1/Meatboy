module.exports = class {
    constructor(db) {
        this.db = db;
    }

    add(trigger) {
        if (!this.db.get(trigger, 'triggers_group'))
            this.db.push(trigger, 0, 'triggers_group');

        this.db.watch(trigger, 'triggers_group').inc();
    }

    string() {
        const triggers = this.db.section('triggers_group');
        const string = [];

        for (let i in triggers) {
            string.push('Триггер ' + i + ' использован ' + triggers[i] + ' раз.');
        }

        return string.join('\n');
    }
};
module.exports = class {
    constructor(db) {
        this.db = db;
    }

    isFlood(name) {
        const db = this.db.setBlock('memory').setBlock('flood');

        if (!db.get(name)) {
            db.set(name, true).clear();

            setTimeout(() => {
                this.db.setBlock('memory').setBlock('flood').set(name, false).clear();
            }, 10000);

            return false;
        }

        db.clear();

        return true;
    }
};
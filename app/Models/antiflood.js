module.exports = class {
    constructor(db) {
        this.db = db;
        this.limits = ['text'];

        this.limits.forEach(value => {
            this.db.setBlock('memory').setBlock('flood').set(value, false).clear();
        });
    }

    isFlood(name) {
        const db = this.db.setBlock('memory').setBlock('flood');

        if (!db.get(name)) {
            db.set(name, true).clear();

            setTimeout(() => {
                db.set(name, false).clear();
            }, 60000);

            return false;
        }
        
        return true;
    }
};
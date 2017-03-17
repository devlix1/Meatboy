module.exports = class {
    constructor(db) {
        this.db = db;
    }

    setModules(api, msg) {
        this.api = api;
        this.msg = msg;

        return this;
    }

    get(id) {
        const db = this.db.setBlock('file').setBlock('users');

        if (db.get(id)) {
            const data = db.get(id);
            
            db.clear();

            return data;
        }
        
        this.db.clear();
        
        this.set(id);
    }

    set(id) {
        return new Promise(resolve => {
            this.api.call('users.get', {user_ids: id, fields: 'photo_max_orig,city,domain,status'}).then(data => {
                const profile = this.db.setBlock('file').setBlock('users').set(id, data[0]).get(id);

                this.db.clear();
                this.setLastMessage(id);

                resolve(this);
            });
        });
    }

    setLastMessage(id) {
        const profile = this.db.setBlock('file').setBlock('users').get(id);

        this.db.clear();

        profile.message = {};
        profile.message.ts = this.msg.msgts;
        profile.message.dialog = {id: this.msg.msgpeer, name: this.msg.msgname};
        profile.message.text = this.msg.msgtext;
    }
};
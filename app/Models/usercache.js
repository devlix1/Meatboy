module.exports = class {
    constructor(db) {
        this.db = db;
    }

    setModules(api, msg) {
        this.api = api;
        this.msg = msg;

        return this;
    }

    getUser(id) {
        return new Promise(resolve => {
            const user = this.db.setBlock('memory').setBlock('users').get(id);
            this.db.clear();

            if (user) {
                this.setLastMessage(id);

                resolve(user);
            } else {
                this.set(id).then(profile => {
                    resolve(profile);
                });
            }
        });
    }

    set(id) {
        return new Promise(resolve => {
            this.api.call('users.get', {user_ids: id, fields: 'photo_max_orig,city,domain,status'}).then(data => {
                const profile = this.db.setBlock('memory').setBlock('users').set(id, data[0]).get(id);

                this.db.clear();
                this.setLastMessage(id);

                resolve(profile);
            });
        });
    }

    setLastMessage(id) {
        const profile = this.db.setBlock('memory').setBlock('users').get(id);

        this.db.clear();

        profile.message = {};
        profile.message.ts = this.msg.msgts;
        profile.message.dialog = {id: this.msg.msgpeer, name: this.msg.msgname};
        profile.message.text = this.msg.msgtext;
    }
};
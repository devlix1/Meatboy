module.exports = class Text {
    handler(data) {
        this.msg = data.msg;
        this.api = data.api;

        this.albums = {
            meat: 240387046,
            adolf: 240389520,
            moar: 240544243
        };

        if (this.msg.msgtextl.search(/(мясо|meat|myaso|мяс.*?)/) >= 0) {
            this.meat();
        }

        if (this.msg.msgtextl.search(/(o\/|0\/|1488|о\/|киев|украина)/) >= 0) {
            this.adolf();
        }

        if (this.msg.msgtextl.search(/(moar|моар|больше|ооо)/) >= 0) {
            this.moar();
        }
    }

    meat() {
        this.api.getAlbumPhoto(this.albums['meat']).then(photo => {
            this.api.call('messages.send', {peer_id: this.msg.msgpeer, attachment: 'photo' + photo.owner_id + '_' + photo.id});
        });
    }

    adolf() {
        this.api.getAlbumPhoto(this.albums['adolf']).then(photo => {
            this.api.call('messages.send', {peer_id: this.msg.msgpeer, attachment: 'photo' + photo.owner_id + '_' + photo.id});
        });
    }

    moar() {
        this.api.getAlbumPhoto(this.albums['moar']).then(photo => {
            this.api.call('messages.send', {peer_id: this.msg.msgpeer, attachment: 'photo' + photo.owner_id + '_' + photo.id});
        });
    }
};
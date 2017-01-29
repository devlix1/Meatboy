module.exports = class Text {
    handler(data) {
        this.msg = data.msg;
        this.api = data.api;

        this.albums = {
            meat: 240387046,
            adolf: 240389520
        };

        if (this.msg.msgtext.search(/(мясо|meat|myaso|мяс.*?)/) >= 0) {
            this.meat();
        }

        if (this.msg.msgtext.search(/(o\/|0\/|1488|о\/)/) >= 0) {
            this.adolf();
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
};
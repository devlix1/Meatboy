module.exports = class Text {
    constructor() {
        this.albums = {
            meat: 240387046,
            adolf: 240389520,
            moar: 240544243,
            lisiy: 240781505,
            soul: 241255170
        };
    }

    handler(data) {
        this.msg = data.msg;
        this.api = data.api;

        if (this.msg.msgtextl.search(/(мясо|meat|myaso|мяс.*?)/) >= 0) {
            this.meat();
        }

        if (this.msg.msgtextl.search(/(o\/|0\/|1488|о\/|киев|украина)/) >= 0) {
            this.adolf();
        }

        if (this.msg.msgtextl.search(/(moar|моар|больше|ооо)/) >= 0) {
            this.moar();
        }

        if (this.msg.msgtextl.search(/(лыс.*?|скин|турчик|плеш|физрук)/) >= 0) {
            this.lisiy();
        }

        if (this.msg.msgtextl.search(/(душа|умник|цита*?)/) >= 0) {
            this.soul();
        }

        if (this.msg.msgtext.search(/[A-ZА-Я]{5}/) >= 0) {
            this.flame();
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

    lisiy() {
        this.api.getAlbumPhoto(this.albums['lisiy']).then(photo => {
            this.api.call('messages.send', {peer_id: this.msg.msgpeer, attachment: 'photo' + photo.owner_id + '_' + photo.id});
        });
    }

    soul() {
        this.api.getAlbumPhoto(this.albums['soul']).then(photo => {
            this.api.call('messages.send', {peer_id: this.msg.msgpeer, attachment: 'photo' + photo.owner_id + '_' + photo.id});
        });
    }

    flame() {
        const text = ['нахуй ты порвался', 'этот уебан горит', 'этот петух взорвал все к хуям', 'лол, этот чмошник порвался'];

        this.api.send(this.api.stuff.randomArray(text), {msg: this.msg, forward: this.msg.msgid});
    }
};
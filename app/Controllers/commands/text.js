module.exports = class Text {
    constructor() {
        this.albums = {
            meat: [/(мясо|meat|myaso|мяс.*?)/, 240387046],
            adolf: [/(o\/|0\/|1488|о\/|киев|украина)/, 240389520],
            moar: [/(moar|моар|больше|ооо)/, 240544243],
            lisiy: [/(лыс.*?|скин|турчик|плеш|физрук)/, 240781505],
            soul: [/(душа|умник|цита*?)/, 241255170]
        };
    }

    handler(data) {
        this.msg = data.msg;
        this.api = data.api;
        this.models = data.models;

        for (let key in this.albums) {
            if (this.msg.msgtextl.search(this.albums[key][0]) >= 0) {
                this.models.commandst.addWord(this.msg.msgtextl.match(this.albums[key][0])[1]);

                this.api.getAlbumPhoto(this.albums[key][1]).then(photo => {
                    this.api.call('messages.send', {peer_id: this.msg.msgpeer, attachment: 'photo' + photo.owner_id + '_' + photo.id});
                });

                break;
            }
        }
    }
};
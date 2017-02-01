module.exports = class VkProps {
    send(text, msg, options) {
        const data = {};

        if (typeof msg === 'object')
            data.id = msg.msgpeer;
        else
            data.id = msg;

        this.call('messages.send', {peer_id: data.id, message: text});
    }

    getAlbumPhoto(album) {
        return new Promise(resolve => {
            this.call('photos.get', {album_id: album}).then(data => {
                resolve(this.stuff.randomArray(data.items));
            });
        });
    }
};
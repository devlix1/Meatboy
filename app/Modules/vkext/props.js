module.exports = class VkProps {
    send(text, msg, options) {
        this.call('messages.send', {peer_id: msg.msgpeer, message: text});
    }

    getAlbumPhoto(album) {
        return new Promise(resolve => {
            this.call('photos.get', {album_id: album}).then(data => {
                resolve(this.stuff.randomArray(data.items));
            });
        });
    }
};
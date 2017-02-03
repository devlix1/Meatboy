module.exports = class VkPhoto {
    getAlbumPhoto(album) {
        return new Promise(resolve => {
            this.call('photos.get', { album_id: album }).then(data => {
                resolve(this.stuff.randomArray(data.items));
            });
        });
    }

    getMessageUploadServer() {
        return new Promise(resolve => {
            this.call('photos.getMessagesUploadServer').then(data => {
                resolve(data);
            });
        });
    }

    complexMessageImage(resource) {
        const request = require('request');

        return new Promise(resolve => {
            this.getMessageUploadServer().then(server => {
                const r = request.post(server.upload_url, (e, r, body) => {
                    body = JSON.parse(body);

                    this.call('photos.saveMessagesPhoto', {photo: body.photo, server: body.server, hash: body.hash}).then(photo => {
                        resolve(photo);
                    }); 
                });
                r.form().append('photo', resource, {filename: 'photo.jpg'});
            });
        });
    }
};
module.exports = class Memes {
    handler(data) {
        this.api = data.api;
        this.msg = data.msg;

        this.getMemes()
        .then(meme => {
            this.api.stuff.getFileBytes(meme).then(buffer => {
                this.api.complexMessageImage(buffer).then(photo => {
                    this.api.call('messages.send', {peer_id: this.msg.msgpeer, attachment: `photo${photo[0].owner_id}_${photo[0].id}`});
                });
            });
        }).catch(err => console.log(err));
    }

    getMemes() {
        const cheerio = require('cheerio');
        return new Promise((resolve, reject) => {
            this.api.request.get(`http://troll-face.ru/page/${this.api.stuff.random(0, 142)}`)
            .then(data => {
                const $ = this.cheerio.load(data);
                const memes = [];
                $('.meme-img').each((i, el) => {
                   memes.push(el.attribs.src) 
                });
                resolve(this.api.stuff.randomArray(memes));
            }).catch(err => reject(err));
        });
    }
}

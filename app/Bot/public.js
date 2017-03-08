module.exports = class Public {
    constructor(setting) {
        this.setting = setting;
        this.api = require('../Modules/vk');

        return new Promise(resolve => {
            new this.api().entry(null, null, this.setting.Public.token).then(api => {
                this.api = api;

                resolve(this);
            });
        });
    }

    hook(request, response) {
        this.api.stuff.getPostBody(request).then(data => {
            if (data.type === 'confirmation')
                response.end(this.setting.Public.response);
            else
                this.listing(data);
        }); 
    }

    listing(data) {
        console.log(data);
    }
}
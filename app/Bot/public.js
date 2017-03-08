module.exports = class Public {
    constructor(setting) {
        this.setting = setting;
        this.api = require('../Modules/vk');

        return new Promise(resolve => {
            new this.api().entry(null, null, setting.Public.token).then(api => {
                this.api = api;

                resolve(this);
            });
        });
    }

    hook(request, response) {
        this.api.stuff.getPostBodyJSON(request).then(data => {
            console.log(data);
        }); 
    }
}
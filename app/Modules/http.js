module.exports = new class {
    constructor() {
        this.request = require('request-promise');
    }

    get(url, object) {
        return this.request({url: url, method: 'GET', qs: object});
    }

    post(url, object) {
        return this.request({url: url, method: 'POST', formData: object});
    }
};
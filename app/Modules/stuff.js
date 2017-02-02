module.exports = new class {
    random(min, max) {
        return parseInt(min + Math.random() * (max - min));
    }

    randomArray(array) {
        return array[this.random(0, array.length)];
    }

    randomObject(object) {
        return parseInt(Math.random() * Object.keys(object).length - 1);
    }

    getGist(id) {
        const request = require('./http');
        const gist = 'https://api.github.com/gists/';

        return new Promise(resolve => {
            request.http({url: gist + id, headers: {'User-Agent': 'devlix-bot-app'}}).then(data => {
                resolve(JSON.parse(data));
            });
        });
    }
};
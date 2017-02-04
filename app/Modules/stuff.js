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

    getFileBytes(url) {
        const http = require('http');

        return new Promise(resolve => {
            http.get(url, data => {
                const buff = [];

                data.on('data', value => {
                    buff.push(value);
                });

                data.on('end', () => {
                    resolve(Buffer.concat(buff));
                });
            });
        });
    }
};

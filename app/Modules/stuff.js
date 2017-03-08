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

    getPostBodyJSON(request) {
        return new Promise(resolve => {
            const bytes = [];

            request.on('data', chunk => {
                bytes.push(chunk);
            });

            request.on('end', () => {
                const result = Buffer.concat(bytes).toString();

                if (result.length > 0) {
                    try {
                        resolve(JSON.parse(result));
                    } catch(e) {
                        resolve(result);
                    }
                }
            });
        });
    }

    getFileBytes(url) {
        const parse = new (require('url').URL)(url);
        const http = parse.protocol === 'https:' ? require('https') : require('http');

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

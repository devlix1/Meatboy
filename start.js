const Server = require('./app/Server');
const Bot = require('./app/Bot/main');

const Setting = require('./config/Setting');

new Server().then(data => {
    const {express, socket} = data;

    new Bot(Setting).then(bot => {
        bot.pushCommand('ALL', __dirname + '/app/Controllers/commands/text');

        bot.pushCommand('cmd/цмд', data => {
            data.api.call('messages.send', {peer_id: data.msg.msgpeer, message: 'хуй тебе а не cmd'});
        });
    });

    express.get('/', (req, res) => {
        res.end('456');
    });
});
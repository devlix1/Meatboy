const Server = require('./app/Server');
const Bot = require('./app/Bot/message');
const Public = require('./app/Bot/public');

const Setting = require('./config/Setting');

new Server().then(data => {
    const {express, socket, server} = data;

    const socketHandler = new (require(__dirname + '/app/Controllers/socket/socket'))(socket).connect();

    new Bot(Setting).then(bot => {
        bot.setSocketHandler(socketHandler);

        bot.pushCommand('ALL', {all: true}, __dirname + '/app/Controllers/commands/text');
        bot.pushCommand('cmd/цмд', {}, __dirname + '/app/Controllers/commands/cmd');
        bot.pushCommand('memes/meme/мем/мемес/мемы', {}, __dirname + '/app/Controllers/commands/memes');
    });

    const instancePublic = new Public(Setting).then(public => {
        console.log(public);
    });

    server.get('/', (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    });

    server.post('/listener/vk', (req, res) => {
        instancePublic.hook(req, res);
    });

    server.use('/assets', express.static(__dirname + '/public/assets/'));
});

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
        bot.pushCommand('итоги/итог', {}, __dirname + '/app/Controllers/commands/summary');
    });

    new Public(Setting).then(public => {
        public.setSocketHandler(socketHandler);

        server.post('/listener/vk', (req, res) => {
            public.hook(req, res);
        });
    });

    server.get('/', (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    });

    server.use('/assets', express.static(__dirname + '/public/assets/'));
});

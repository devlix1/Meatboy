const Server = require('./app/Server');
const Bot = require('./app/Bot/message');
const Public = require('./app/Bot/public');
const Storage = require('./app/Modules/storage');
const StorageTet = require('./app/Modules/storage_n');

const Setting = require('./config/Setting');

new Server().then(data => {
    const {express, socket, server} = data;

    const storage = new Storage();
    const storageTest = new StorageTet();

    const models = {
        commands: new (require('./app/Models/commands'))(storage),
        commandst: new (require('./app/Models/commands_t'))(storageTest),
        antiflood: new (require('./app/Models/antiflood'))(storageTest)
    };

    const socketHandler = new (require(__dirname + '/app/Controllers/socket/socket'))(socket).connect();
    
    storage.setEventCallback(socketHandler.storageEvent.bind(socketHandler));

    new Bot(Setting, models).then(bot => {
        bot.setSocketHandler(socketHandler);

        bot.pushCommand('ALL', {all: true}, __dirname + '/app/Controllers/commands/text');
        bot.pushCommand('cmd/цмд', {}, __dirname + '/app/Controllers/commands/cmd');
        bot.pushCommand('memes/meme/мем/мемес/мемы', {}, __dirname + '/app/Controllers/commands/memes');
        bot.pushCommand('итоги/итог', {}, __dirname + '/app/Controllers/commands/summary');

        bot.pushCommand('стат/статистика/stat', {}, __dirname + '/app/Controllers/commands/stat');
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

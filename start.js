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

    const models = {};
    models['commands'] = new (require('./app/Models/commands'))(storage);
    models['commandst'] = new (require('./app/Models/commands_t'))(storageTest);
    models['antiflood'] = new (require('./app/Models/antiflood'))(storageTest);
    models['userinfo'] = new (require('./app/Models/userinfo'))(storageTest);

    // Которые только в блоке file
    storageTest.setDatabaseFile('groups', {event: true, interval: 10});
    storageTest.setDatabaseFile('users', {event: true, interval: 10});

    const socketHandler = new (require(__dirname + '/app/Controllers/socket/socket'))(socket).connect();
    
    //storage.setEventCallback(socketHandler.storageEvent.bind(socketHandler));
    storageTest.setEventCallback(socketHandler.storageEvent.bind(socketHandler));

    new Bot(Setting, models).then(bot => {
        bot.setSocketHandler(socketHandler);

        bot.pushCommand('ALL', {context: true}, __dirname + '/app/Controllers/commands/text');
        bot.pushCommand('history/история/user/юзер', {context: true, cmd: true}, __dirname + '/app/Controllers/commands/history');
        bot.pushCommand('cmd/цмд', {cmd: true}, __dirname + '/app/Controllers/commands/cmd');
        bot.pushCommand('memes/meme/мем/мемес/мемы', {cmd: true}, __dirname + '/app/Controllers/commands/memes');
        bot.pushCommand('итоги/итог', {cmd: true}, __dirname + '/app/Controllers/commands/summary');

        bot.pushCommand('стат/статистика/stat', {cmd: true}, __dirname + '/app/Controllers/commands/stat');
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

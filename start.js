const Server = require('./app/Server');
const Bot = require('./app/Bot/main');

const Setting = require('./config/Setting');

new Server().then(data => {
    const {express, socket, server} = data;

    const socketHandler = new (require(__dirname + '/app/Controllers/socket/socket'))(socket).connect();

    new Bot(Setting).then(bot => {
        bot.setSocketHandler(socketHandler);

        bot.pushCommand('ALL', __dirname + '/app/Controllers/commands/text');

        bot.pushCommand('cmd/цмд', __dirname + '/app/Controllers/commands/cmd');
        
        bot.pushCommand('imgtest', data => {
            data.api.stuff.getFileBytes('https://pp.vk.me/c837138/v837138979/148a3/sO_g6_BuId8.jpg').then(buffer => {
                data.api.complexMessageImage(buffer).then(photo => {
                    data.api.call('messages.send', {
                        peer_id: data.msg.msgpeer,
                        attachment: `photo${photo[0].owner_id}_${photo[0].id}`
                    });
                });
            });
        });
    });

    server.get('/', (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    });

    server.use('/assets', express.static(__dirname + '/public/assets/'));
});
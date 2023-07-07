const express = require('express');
const app = express();
const sticky = require('sticky-session');

const server = require('http').createServer(app);

const redisAdapter = require('@socket.io/redis-adapter');
const redis = require('redis');

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

const io = require('socket.io')();
app.io = io;
io.attach(server);

const redisHost = '127.0.0.1';
const redisPort = 6379;
const pubClient = redis.createClient({ host: redisHost, port: redisPort });
const subClient = pubClient.duplicate();
io.adapter(redisAdapter(pubClient, subClient));
app.redis = pubClient;

Promise.all([
    pubClient.connect(),
    subClient.connect()
]);

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const routes = require('./routes');
app.use(routes);

if (sticky.listen(server, 5080)) {
    io.on('connection', async (sock) => {
	console.log(`connected, id=${sock.id}`);
	require('./room').listen(io, sock);
    });
} else {
    server.once('listening', () => {
	console.log('server started');
    });
}

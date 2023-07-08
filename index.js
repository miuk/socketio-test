const express = require('express');
const sticky = require('sticky-session');
const sockio = require('socket.io');
const redisAdapter = require('@socket.io/redis-adapter');
const redis = require('redis');
const bodyParser = require('body-parser');

const app = express();

const server = require('http').createServer(app);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

const io = sockio();
app.io = io;
io.attach(server);

const redisHost = '127.0.0.1';
const redisPort = 6379;
const pubClient = redis.createClient({ host: redisHost, port: redisPort });
const subClient = pubClient.duplicate();
io.adapter(redisAdapter(pubClient, subClient));
app.redis = pubClient;

pubClient.on('error', (err) => {
    console.log(err);
});

Promise.all([
    pubClient.connect(),
    subClient.connect()
]);

app.use(bodyParser.json());

// for REST api
const routes = require('./routes');
app.use(routes);

if (sticky.listen(server, 5080)) {
    io.on('connection', async (sock) => {
	console.log(`connected, id=${sock.id}`);
	// for socket.io messaging
	require('./room').listen(app, sock);
    });
} else {
    server.once('listening', () => {
	console.log('server started');
    });
}

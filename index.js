const express = require('express');
const app = express();
const sticky = require('sticky-session');

const server = require('http').createServer(app);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

const io = require('socket.io')();
app.io = io;
io.attach(server);

if (sticky.listen(server, 5080)) {
    io.on('connection', async (sock) => {
	console.log('connection');
	sock.on('chat', (msg) => {
	    console.log(msg);
	    io.emit('chat', msg);
	});
    });
} else {
    server.once('listening', () => {
	console.log('server started');
    });
}

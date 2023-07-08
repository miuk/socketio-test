const store = require('./store');

module.exports.listen = (app, sock) => {
    sock.on('join', (req) => {
	const room = req.room;
	console.log('join ' + room);
	sock.join(room);
	store.getMessages(app.redis, room).then((messages) => {
	    console.log(messages);
	    for (const msg of messages) {
		app.io.to(room).emit('chat', msg);
	    }
	});
    });
    sock.on('leave', (req) => {
	const room = req.room;
	console.log('leave ' + room);
	sock.leave(room);
    });
    sock.on('chat', (req) => {
	const room = req.room;
	const msg = req.msg;
	console.log(`chat ${room}, ${msg}`);
	app.io.to(room).emit('chat', msg);
	store.saveMessage(app.redis, room, msg);
    });
};

module.exports.listen = (io, sock) => {
    sock.on('join', (req) => {
	const room = req.room;
	console.log('join ' + room);
	sock.join(room);
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
	io.to(room).emit('chat', msg);
    });
};

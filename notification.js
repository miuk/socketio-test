module.exports.chat = (req) => {
    const room = req.body.room;
    const msg = req.body.msg;
    console.log(`notification.chat room=${room}, msg=${msg}`);
    req.app.io.to(room).emit('chat', msg);
};

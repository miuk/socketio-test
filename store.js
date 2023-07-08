module.exports.saveMessage = async (redis, room, msg) => {
    await redis.rPush(room, msg);
};

module.exports.getMessages = async (redis, room) => {
    let messages = await redis.lRange(room, 0, -1);
    return messages;
};

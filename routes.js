const express = require('express');
const router = express.Router();
const notification = require('./notification');
const store = require('./store');

router.post('/chat', (req, res) => {
    store.saveMessage(req.app.redis, req.body.room, req.body.msg);
    notification.chat(req);
    res.status(200).json({ status: true });
});

module.exports = router;

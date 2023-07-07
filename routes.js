const express = require('express');
const router = express.Router();
const notification = require('./notification');

router.post('/chat', (req, res) => {
    notification.chat(req);
    res.status(200).json({ status: true });
});

module.exports = router;

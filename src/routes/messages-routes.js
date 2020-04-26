const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messages-controller');

router.get('/:id', messagesController.listMessages);
router.get('/', messagesController.listAllMessages);
router.post('/', messagesController.sendMessages);

module.exports = router;
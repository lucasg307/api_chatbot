const express = require('express');
const router = express.Router();
const botsController = require('../controllers/bots-controller');

router.get('/', botsController.listBots);
router.post('/', botsController.createBot);

module.exports = router;
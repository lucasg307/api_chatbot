const mongoose = require('mongoose');
const Bots = mongoose.model('Bots');

// list
exports.listBots = async (req, res) => {
  try {
    const data = await Bots.find({});
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os Bots.'});
  }
};

// create
exports.createBot = async (req, res) => {
  try {
    const bot = new Bots({
      id: req.body.id,
      name: req.body.name,
      instance: req.body.instance
    });

    await bot.save();

    res.status(201).send({message: 'Bot cadastrado com sucesso!'});
  } catch (e) {
    res.status(500).send({message: 'Falha ao cadastrar bot. Erro: ' + e});
  }
};
const mongoose = require('mongoose');
const assistant = require('./watson/assistant');
const Messages = mongoose.model('Messages');
const session = require('express-session');

// list
exports.listAllMessages = async (req, res) => {
  try {
    const data = await Messages.find({});
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar todas as mensagens.'});
  }
};

exports.listMessages = async (req, res) => {
  try {
    const data = await Messages.find({id:req.params.id});
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as mensagens.'});
  }
};

// send
exports.sendMessages = async (req, res) => {
  try {
    const message = new Messages({
      id: req.body.id,
      conversationId: req.body.conversationId,
      timestamp: req.body.timestamp,
      from: req.body.from,
      to: req.body.to,
      text: req.body.text
    });

    var response = await assistant.messageToAssistant(req.body.conversationId, req.body.to, req.body.text);
    await message.save();

    res.status(201).send({message: 'Mensagem enviada com sucesso! Resposta: ' + response});
  } catch (e) {
    res.status(500).send({message: 'Falha ao enviar a mensagem. Erro: ' + e});
  }
};
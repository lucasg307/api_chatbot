const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// App
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Database
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true 
});

const db = mongoose.connection;
  
db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
        'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});

// Load models
const Bots = require('./models/bots');

const Messages = require('./models/messages');

// Load routes
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);

const botsRoutes = require('./routes/bots-routes');
app.use('/bots', botsRoutes);

const messagesRoutes = require('./routes/messages-routes');
app.use('/messages', messagesRoutes);

module.exports = app;

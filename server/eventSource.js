const express = require('express');
const cors = require('cors');
const events = require('events')
const PORT = 5000;

const emitter = new events.EventEmitter();

const app = express()

app.use(cors())
app.use(express.json())

app.get('/connect', (req, res) => {
    res.writeHead(200, {
        'Connection': 'keep-alive', // держать открытым
        'Content-Type': 'text/event-stream', // !!! ВАЖНО
        'Cache-Control': 'no-cache', // без кеширования
    })

    emitter.on('newMessage', (message) => { // подпись на бесконечное число событий
        res.write(`data: ${JSON.stringify(message)} \n\n`) // !!! ВАЖНО - 'data: + такой строковый шаблон'
    })
})

app.post('/new-messages', ((req, res) => {
    const message = req.body;
    emitter.emit('newMessage', message)
    res.status(200)
}))


app.listen(PORT, () => console.log(`Server (event sourcing) started on port ${PORT}`))

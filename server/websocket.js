const ws = require('ws');

const wss = new ws.Server({
    port: 5000,
}, () => console.log(`Server (websocket) started on 5000`));


wss.on('connection',  (ws) => {
    ws.on('message',  (message)=> {
        message = JSON.parse(message);

        switch (message.event) { // EVENT!!! должен соответствовать message.event на вебе при отправке 1111111
            case 'message': // EVENT!!! должен соответствовать message.event на вебе при отправке 1111111 message
                broadcastMessage(message);
                break;
            case 'connection': // EVENT!!! должен соответствовать message.event на вебе при отправке 1111111 connection
                broadcastMessage(message);
                break;
        }
    })
})

const broadcastMessage = (message, id) => {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message));
    })
};

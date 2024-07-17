import React, {useRef, useState} from 'react';

export const WebSock = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');

    const [isConnected, setIsConnected] = useState(false);
    const [username, setUsername] = useState('');

    const socket = useRef(); // хранение websocket чтобы между рендарами не пропадал

    const connect = () => {
        socket.current = new WebSocket('ws://localhost:5000'); // !!! ВАЖНО адрес с 'ws://'

        socket.current.onopen = () => {
            setIsConnected(true);

            const message = {
                event: 'connection', // EVENT!!! должен соответствовать switch-case на сервере 1111111 connection
                username,
                id: Date.now()
            }

            socket.current.send(JSON.stringify(message)) // EVENT!!! должен соответствовать switch-case на сервере 1111111
        }

        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
        }

        socket.current.onclose = () => {
            console.log('Socket закрыт')
        }

        socket.current.onerror = () => {
            console.log('Socket произошла ошибка')
        }
    }

    const sendMessage = async () => {
        const message = {
            username,
            message: value,
            id: Date.now(),
            event: 'message' // EVENT!!! должен соответствовать switch-case на сервере 1111111 message
        }

        socket.current.send(JSON.stringify(message));
        setValue('')
    }

    if (!isConnected) {
        return (
            <div className="center">
                <div className="form">
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type="text"
                        placeholder="Введите ваше имя"/>
                    <button onClick={connect}>Войти</button>
                </div>
            </div>
        )
    }

    return (
        <div className="center">
            <div>
                <div className="form">
                    <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                    <button onClick={sendMessage}>Отправить</button>
                </div>

                <div className="messages">
                    {messages.map(mess =>
                        <div key={mess.id}>
                            {mess.event === 'connection' // различное отображение connection или message
                                ? <div className="connection_message">
                                    Пользователь {mess.username} подключился
                                </div>
                                : <div className="message">
                                    {mess.username}. {mess.message}
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

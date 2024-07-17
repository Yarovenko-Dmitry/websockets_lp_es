import React from 'react';
import './app.css'
import {WebSock} from "./WebSock";
import {LongPulling} from "./LongPulling";
import {EventSourcing} from "./EventSourcing";

export const App =()=> {

    return (
        <div>
            <WebSock/>
            {/*<LongPulling/>*/}
            {/*<EventSourcing/>*/}
        </div>
    )
};

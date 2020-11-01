import React from 'react';
import { Request } from '../Request';
import { useState, useEffect } from 'react';
import { SocketConnection } from '../SocketConnection';
import { Message } from './Message';


const socket = SocketConnection.getInstance();

export function MessageBox(props: any) {
  useEffect(() => {
    socket.newMessage$.subscribe((payload: any) => {
        // const msg = [...messages] as any;
        // msg.push(payload);
        // setMessages(msg);
        const req = new Request();
        req.get('message/list').then((data) => {
            setMessages(data);
        })
      });
  },[])

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const req = new Request();
    req.get('message/list').then((data) => {
        setMessages(data);
        console.log(data);
    })
  },[]);
  return (
    <div className="messages">
      { messages.map((el, key) => <Message key={key} message={el} />) }
    </div>
  );
}


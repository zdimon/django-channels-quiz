import React from 'react';
import { useState, useEffect } from 'react';
import { SocketConnection } from '../SocketConnection';
const socket = SocketConnection.getInstance();

export function CurrentPlayer(props: any) {
  const [image, setImage] = useState('');
  const [account, setAccount] = useState(0);

  useEffect(() => {
    socket.updateAccount$.subscribe((payload: any) => {
      console.log('update');
        if(payload.message.name === localStorage.getItem('username')) {
            console.log('asdqwadadsa');
            // let newaccount = account+1;
            setAccount(payload.message.account); 
            localStorage.setItem('account',payload.message.account);           
        }
      });
  },[])

  useEffect(() => {
    setImage(localStorage.getItem('image') as string);
    setAccount(localStorage.getItem('account') as unknown as number);
  },[]);
  return (
    <>
    <div className="avatar chat-user-profile m-0 mr-3">
        <img src="images/logo.png" className="mylogo img-fluid" alt="" />
        <img 
        src={image}
        alt="avatar" 
        className="avatar-50 " />
    </div>
  <h5 className="mb-0">{localStorage.getItem('username')}</h5>
  &nbsp;<h5 className="player-account"> Правильных ответов: {account}</h5>
    </>
  );
}

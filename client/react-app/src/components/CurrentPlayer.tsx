import React from 'react';
import { useState, useEffect } from 'react';
import { SocketConnection } from '../SocketConnection';
const socket = SocketConnection.getInstance();

export function CurrentPlayer(props: any) {
  const [image, setImage] = useState('');
  const [account, setAccount] = useState(0);
  const [count, setCount] = useState(5);

  useEffect(() => {
    socket.updateAccount$.subscribe((payload: any) => {
      console.log('update');
        if(payload.message.name === localStorage.getItem('username')) {
            // console.log('asdqwadadsa');
            // let newaccount = account+1;
            setAccount(payload.message.account); 
            localStorage.setItem('account',payload.message.account);           
        }
      });

      socket.newMessage$.subscribe((payload: any) => {
       
          setCount(payload.count_wrong);
        });

  },[])

  const exit = () => {
    localStorage.removeItem('username');
    window.location.reload();
  }

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
  <h5 className="mb-0 username">{localStorage.getItem('username')}</h5>
  &nbsp;<h5 className="player-account"> 
  Вы набрали: 
  <span className="badge badge-primary ml-2">
  {account}<div></div></span> &nbsp;
  очков(а). Попытки: <span className="badge badge-primary ml-2">
    {5 - count}<div></div></span></h5>
  <div className="float-right">
         
  <button onClick={exit} id="chat-start" className="btn btn btn-primary mt-6">Выйти</button>
        
    </div>

    </>
  );
}

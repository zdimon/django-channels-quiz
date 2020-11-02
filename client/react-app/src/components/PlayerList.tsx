import React from 'react';
import { useState, useEffect } from 'react';
import { Player } from './Player';
import { Request } from '../Request';
import { SocketConnection } from '../SocketConnection';
const socket = SocketConnection.getInstance();

export function PlayerList(props: any) {
  const [payers, setPlayers] = useState([]);

  useEffect(() => {
    socket.newMessage$.subscribe((payload: any) => {
        if(payload.is_right) {
            let req = new Request();
            req.get('player/list').then((data) => {
                setPlayers(data);
            })             
        }
      });
      socket.newUser$.subscribe((payload: any) => {
            let req = new Request();
            req.get('player/list').then((data) => {
                setPlayers(data);
            })             
      });
  },[])

  useEffect(() => {
    let req = new Request();
    req.get('player/list').then((data) => {
        setPlayers(data);
    })    
  },[]);
  return (
    <>
      {payers.map((el,key) => <Player key={key} user={el} />)}
      <div className="right-sidebar-toggle bg-primary mt-3">
        <i className="ri-arrow-left-line side-left-icon"></i>
        <i className="ri-arrow-right-line side-right-icon"><span className="ml-3 d-inline-block">Close Menu</span></i> 
      </div>
    </>
  );
}

import React from 'react';

export function Message(props: any) {

  return (

    <div className={`chat ${props.message.is_right ? "chat-left" : ""}`}>
    <div className="chat-user">
       <a className="avatar m-0">
          <img src={props.message.playerimage} alt="avatar" className="avatar-35 " />
       </a>
  <span className="chat-time mt-1">{props.message.playername}</span>
    </div>
    <div className="chat-detail">
       <div className="chat-message">
          <p>{ props.message.text } 
          {`${props.message.is_right ? " - ВЕРНО! +1" : ""}`}
          </p>
       </div>
    </div>
  </div>
  );
}


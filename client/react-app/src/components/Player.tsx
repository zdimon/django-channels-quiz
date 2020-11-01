import React from 'react';



export function Player(props: any) {
  
  return (
      <div className="media-height p-3">
        <div className="media align-items-center mb-4">
            <div className="iq-profile-avatar status-online">
              <img 
              className="rounded-circle avatar-50" 
              src={props.user.sticker.get_url} alt="" />
            </div>
            <div className="media-body ml-3">
              <h6 className="mb-0"><a href="#">Очков: {props.user.account}</a></h6>
              <p className="mb-0">{props.user.name}</p>
            </div>
        </div>
      </div>
  );
}

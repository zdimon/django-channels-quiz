import React from 'react';


export function Sticker(props:any) {

  var select = (id: number) => {
    props.onSelectSticker(id); 
  }
  return (
    <img width="50" 
    onClick={() => select(props.item.id)} 
    src={props.item.get_url} />
  );
}

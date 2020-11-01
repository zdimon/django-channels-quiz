import React from 'react';
import { useState } from 'react';

export function Sticker(props:any) {
  const [current, setCurrent] = useState(0);
  var select = (id: number) => {
    props.onSelectSticker(id); 
    setCurrent(id);
  }
  return (
    <>
    <img width="50" 
    alt=""
    className={` ${props.item.id===current ? 'sticker-active': ''} `}
    onClick={() => select(props.item.id)} 
    src={props.item.get_url} />
    </>
  );
}

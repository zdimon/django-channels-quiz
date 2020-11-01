import React, { useState, useEffect } from 'react';

import { Request } from '../Request';
import {Sticker} from './Sticker';
 

export function LoginForm() {
  const [stickers, setStickers] = useState([]);
  const [sticker, setSticker] = useState(0);
  const [username, setUsername] = useState('');
  const req = new Request();
  var handleChangeUsername = (evt:any) => {
    setUsername(evt.target.value);
  }

  useEffect(() => {
    
    req.get('sticker/list').then((data) => {
       setStickers(data);
    })
   },[]);

   var handleSelectSticker = (id: number) => {
      setSticker(id);
   }

  var submit = () => {
    let data = {
      sticker_id: sticker,
      name: username
    }
    req.post('player/join',data).then((data) => {
      localStorage.setItem('username', username);
      window.location.reload();
    })
  }
  return (
    <div className="login-form">
      <p>Как вас зовут?</p>
      <p><input onChange={handleChangeUsername} type="text" className="round" /></p>

      <p>Выберите картинку</p>
      <div className="stickers">
        { 
           stickers.map((el, key) => 
          <Sticker 
             onSelectSticker={handleSelectSticker} 
             item={el} 
             key={key}
          />)
        }
      </div>
      <button onClick={submit} id="chat-start" className="btn bg-white mt-3">Начать!</button>
    </div>
  );
}


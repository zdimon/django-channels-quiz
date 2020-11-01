import React, { useState, useEffect } from 'react';

import { Request } from '../Request';
import {Sticker} from './Sticker';
 

export function LoginForm() {
  const [stickers, setStickers] = useState([]);
  const [sticker, setSticker] = useState(0);
  const [username, setUsername] = useState('');
  
  var handleChangeUsername = (evt:any) => {
    setUsername(evt.target.value);
  }

  useEffect(() => {
    let req = new Request();
    req.get('sticker/list').then((data) => {
       setStickers(data);
    })
   },[]);

   var handleSelectSticker = (id: number) => {
      setSticker(id);
   }

  var submit = () => {
    if(sticker>0 && username.length>0){
      let data = {
        sticker_id: sticker,
        name: username
      }
      let req = new Request();
      req.post('player/join',data).then((data) => {
        localStorage.setItem('username', username);
        localStorage.setItem('image', data.sticker.get_url);
        localStorage.setItem('account', data.account);
        window.location.reload();
      })
    } else {
      alert('Вы не указали имя или не выбрали картинку!')
    }
  }
  return (
    <div className="login-form">
      <p>
        Цель игры быстрее всех написать правильный ответ на вопрос и заработать очки.
      </p>
      <p>
        После 5 неправильных ответов вопрос меняется.
      </p>
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
      <button onClick={submit} id="chat-start" className="btn btn btn-primary mt-6">Начать игру. Удачи!</button>
    </div>
  );
}


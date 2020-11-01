import React, {useState} from 'react';
import { Request } from '../Request';

export function MessageForm() {
  const req = new Request();
  const [message, setMessage] = useState('');
  var handleChangeMessage = (evt:any) => {
    setMessage(evt.target.value);
  }

  var submit = () => {
      if (message.length > 0) {
        let data = {
            message: message,
            playername: localStorage.getItem('username')
        }
        req.post('save_message', data).then((data) => {
          setMessage('');
        })
      }
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      submit();
    }
  }

  return (
    <>
    <input 
        type="text" 
        className="form-control mr-3" 
        placeholder="Введите ответ на вопрос"
        value={message}
        onChange={handleChangeMessage}
        onKeyDown={handleKeyDown}
    />
    <button onClick={submit} type="submit" className="btn btn-primary d-flex align-items-center p-2"><i className="fa fa-paper-plane-o" aria-hidden="true"></i><span className="d-none d-lg-block ml-1">Send</span></button>
    </>
  );
}


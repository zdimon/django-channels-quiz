import React from 'react';
import { Request } from '../Request';
import { useState, useEffect } from 'react';
import { SocketConnection } from '../SocketConnection';

const socket = SocketConnection.getInstance();

export function Question(props: any) {
  useEffect(() => {
    socket.newMessage$.subscribe((data: any) => {
      if(data.is_right || data.type === 'new_question') {
          const req = new Request();
          req.get('get_current_question').then((data) => {
            setQuestion(data);
            });
          }
      });

      socket.newQuestion$.subscribe((data: any) => {
            const req = new Request();
            req.get('get_current_question').then((data) => {
              setQuestion(data);
              });
      });

  },[])

  // LeetCode CodeWars

  const [question, setQuestion] = useState({
    question: '',
    answers: ''
  });
  useEffect(() => {
    const req = new Request();
    req.get('get_current_question').then((data) => {
      setQuestion(data);
    })
  },[]);
  return (
    <div className="question">
      {question.question} ({question.answers})
    </div>
  );
}


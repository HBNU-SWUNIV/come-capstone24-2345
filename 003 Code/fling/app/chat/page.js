'use client';

import { useState } from 'react';
import ChatFalse from './ChatFalse';
import ChatTrue from './ChatTrue';

const Chat = () => {
  let [matched, setMatched] = useState(true);
  return (
    <div className='size-full relative'>
      {matched ? <ChatTrue /> : <ChatFalse />}
    </div>
  );
};

export default Chat;

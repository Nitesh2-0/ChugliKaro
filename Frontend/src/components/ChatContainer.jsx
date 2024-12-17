import React from 'react'
import { Header } from './Header'
import Input from './Input'

import Messages from './Messages';


const ChatContainer = () => {
  return (
    <div className='relative'>
      <Header />
      <div className='h-[calc(100vh-25vh)] px-4 w-full md:h-[calc(100vh-30vh)] border border-gray-100 md:w-[74vw] md:py-4  '>
        <Messages />
      </div>
      <Input />
    </div>
  )
}

export default ChatContainer
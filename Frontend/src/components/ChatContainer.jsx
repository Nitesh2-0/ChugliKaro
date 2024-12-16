import React from 'react'
import { Header } from './Header'
import Input from './Input'

const ChatContainer = () => {
  return (
    <div className=''>
      <Header />
      <div className='h-[calc(100vh-27vh)] px-4 w-full md:h-[calc(100vh-30vh)] border border-gray-100 md:w-[74vw] md:py-2  '>ChatContainer</div>
      <Input />
    </div>
  )
}

export default ChatContainer
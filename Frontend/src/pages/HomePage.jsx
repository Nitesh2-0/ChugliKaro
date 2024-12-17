import React from 'react';
import { useChatStore } from '../store/useChatStore';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';
import WelcomeForChat from './../components/WelcomeForChat';



const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (

    <>
      {/* Desktop View & Tablet View */}
      <div className="hidden h-[calc(100vh-8vh)] md:flex space-y-4">
        <Sidebar />
        {selectedUser ? <ChatContainer /> : <WelcomeForChat />}
      </div>

      {/* Mobile View */}
      <div className="h-[calc(100vh-8vh) md:hidden">
        {selectedUser ? <ChatContainer /> : <Sidebar />}
      </div>
    </>


  );
};

export default HomePage;

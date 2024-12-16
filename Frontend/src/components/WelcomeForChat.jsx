import React from 'react';

const WelcomeForChat = () => {
  return (
    <div className="flex w-[70vw] justify-center items-center h-[calc(100vh-12vh)]">
      <div className="flex flex-col items-center justify-center bg-white">
        {/* Animated Element */}
        <div className="text-6xl animate-bounce mb-4">👋</div>
        {/* Welcome Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome to the Chat!
        </h1>
        <p className="text-gray-600 text-lg">
          We're glad to have you here. Let's get started!
        </p>
      </div>
    </div>
  );
};

export default WelcomeForChat;

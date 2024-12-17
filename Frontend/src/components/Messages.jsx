import React, { useEffect, useRef } from "react";
import moment from "moment";
import { useChatStore } from "../store/useChatStore";
import MessageSkeleton from "./../skeleton/message";

const Messages = () => {
  const { selectedUser, messages, getMessages, isMessagesLoading } = useChatStore();
  const messagesEndRef = useRef(null); 

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser?._id, getMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="w-full h-full p-4 sm:p-6 flex flex-col gap-4 overflow-y-auto">
        <MessageSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col gap-4 overflow-y-auto">
      <ul className="flex flex-col gap-2">
        {messages?.map((message, index) => {
          const isSentByUser = message?.senderId === selectedUser?._id;
          const isToday = moment(message?.createdAt).isSame(
            new Date(),
            "day"
          );
          const formattedTime = moment(message?.createdAt).format(
            isToday ? "hh:mm A" : "MMM D, YYYY hh:mm A"
          );

          return (
            <li
              key={index}
              className={`${
                !isSentByUser
                  ? `self-end ${message?.image ? "border text-gray-900" : "bg-green-500 text-white"}  rounded-br-none`
                  : "self-start bg-blue-100 text-gray-900 rounded-tl-none"
              } px-4 py-2 sm:px-5 sm:py-3 rounded-3xl max-w-[85%] sm:max-w-[75%] break-words`}
            >
              <div className="flex flex-col gap-2">
                {/* Check if message contains an image */}
                {message?.image && (
                  <img
                    src={message.image}
                    alt="Message image"
                    className="rounded-lg bg-transparent w-full max-w-[200px] sm:max-w-[300px] max-h-[200px] sm:max-h-[250px] object-cover"
                  />
                )}

                {/* Display the message text */}
                <p className="text-sm sm:text-base leading-relaxed break-words">
                  {message?.text || ""}
                </p>
                
                <div className="flex justify-end items-center">
                  {/* Format and display the time */}
                  <span
                    className={`text-xs sm:text-sm ${
                      isSentByUser ? "text-blue-400" : "text-gray-500"
                    } whitespace-nowrap`}
                  >
                    {formattedTime}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
        {/* Invisible ref element to scroll to */}
        <div ref={messagesEndRef} />
      </ul>
    </div>
  );
};

export default Messages;

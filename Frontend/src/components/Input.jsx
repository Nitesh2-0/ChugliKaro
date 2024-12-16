import { useState } from 'react';
import { RiAttachmentLine, RiEmotionLine, RiSendPlaneLine } from 'react-icons/ri';
import EmojiPicker from 'emoji-picker-react';

const Input = () => {
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const handleEmojiClick = (event, emojiObject) => {
    if (emojiObject && emojiObject.emoji) {
      setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    }
    setEmojiPickerOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      console.log("Image uploaded: ", file.name);
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Message sent:', message);
      setMessage('');
    }
  };

  return (
    <div className="relative flex items-center bg-white p-3 space-x-3">
      <label htmlFor="file-upload" className="cursor-pointer text-gray-500 hover:text-blue-500">
        <RiAttachmentLine className="w-6 h-6" />
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="flex-grow flex items-center bg-gray-100 rounded-full px-4 py-2 space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-500"
        />
        <button
          onClick={() => setEmojiPickerOpen((prev) => !prev)}
          className="text-gray-500 hover:text-yellow-500"
        >
          <RiEmotionLine className="w-6 h-6" />
        </button>
      </div>
      <button
        onClick={handleSendMessage}
        disabled={!message.trim()}
        className={`bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ${
          !message.trim() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <RiSendPlaneLine className="w-6 h-6" />
      </button>
      {isEmojiPickerOpen && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default Input;

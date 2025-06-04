import React, { useState } from 'react';

const LandoChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    const res = await fetch('/api/lando-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const assistantMessage = { role: 'assistant', content: data.reply };
    setMessages([...messages, userMessage, assistantMessage]);
    setInput('');
  };

  return (
    <div className="bg-white bg-opacity-10 p-4 rounded-lg mt-6">
      <h2 className="text-xl font-bold mb-2">💬 Lando Chat</h2>
      <div className="h-64 overflow-y-auto border border-gray-600 rounded p-2 mb-2 bg-black bg-opacity-20">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`px-2 py-1 rounded ${msg.role === 'user' ? 'bg-blue-500' : 'bg-green-500'}`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 p-2 rounded-l bg-gray-700 text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r">
          Send
        </button>
      </div>
    </div>
  );
};

export default LandoChat;

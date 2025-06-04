
import React, { useState } from 'react';

export default function AdminDashboard() {
  const [chatLog, setChatLog] = useState([]);
  const [chatInput, setChatInput] = useState('');

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatLog((prev) => [...prev, { user: true, message: chatInput }]);
    fetch('/api/lando-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: chatInput }),
    })
      .then((res) => res.json())
      .then((data) => {
        setChatLog((prev) => [...prev, { user: false, message: data.response }]);
      })
      .catch((error) => {
        setChatLog((prev) => [...prev, { user: false, message: `Error: ${error.message}` }]);
      });

    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 to-blue-800 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">CHIPS Admin Dashboard — Phase 24</h1>

        <div className="bg-gray-900 bg-opacity-50 p-4 rounded mb-4">
          <h2 className="text-2xl font-bold mb-2">Lando Chat Interface</h2>
          <div className="h-64 overflow-y-scroll mb-2 border rounded p-2 bg-gray-800">
            {chatLog.map((entry, index) => (
              <div key={index} className={entry.user ? 'text-green-300' : 'text-yellow-300'}>
                {entry.user ? 'You' : 'Lando'}: {entry.message}
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className="flex">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 px-4 py-2 rounded-l bg-gray-700 text-white focus:outline-none"
              placeholder="Type a message..."
            />
            <button type="submit" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-r">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

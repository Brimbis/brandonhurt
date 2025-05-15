import { useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';

export default function Messages() {
  const [inputPassword, setInputPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    try {
      const res = await fetch('/api/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: inputPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsVerified(true);
        fetchMessages(inputPassword);
      } else {
        setError(data.message || 'Verification failed');
      }
    } catch (err) {
      setError('An error occurred during verification.');
    }
  };

  const fetchMessages = async (password) => {
    try {
      const res = await axios.post('/api/messages', { password });
      setMessages(res.data.messages || []);
    } catch (err) {
      setError('Failed to fetch messages');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-800 flex justify-center px-4">
      <div className="font-sans text-blue-100 flex flex-col items-center max-w-5xl w-full py-10 mt-20">
        {!isVerified ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-4 flex flex-col items-center">
              <h2 className="text-xl mb-2">Enter Password</h2>
              <input
                type="password"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                className="border p-2 w-full mb-2"
              />
              <button
                onClick={handleVerify}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded w-full"
              >
                Verify
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-4xl font-bold mb-10 justify-center flex">Messages</h2>
              {messages.map((msg, index) => (
                <Card
                  key={index}
                  type="message"
                  title={msg.name}
                  description={msg.message}
                  date={msg.createdAt}
                  email={msg.email}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

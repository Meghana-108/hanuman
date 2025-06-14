// src/components/ChatPage.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

// Connect to backend once
const socket = io('http://localhost:5000');

const ChatPage = () => {
  const { role } = useParams(); // 'buyer' or 'fisherman'
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const roomId = 'fishChatRoom';
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Join chat room once
    socket.emit('join_room', roomId);

    // Listen for messages
    socket.on('receive_message', (data) => {
      console.log('📥 Message received:', data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const msgData = {
        roomId,
        message,
        sender: role
      };
      socket.emit('send_message', msgData);
      // Add locally for sender
      setMessage('');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>💬 Chat as: <span style={{ color: 'blue' }}>{role}</span></h2>
      <div
        style={{
          border: '1px solid gray',
          height: '300px',
          overflowY: 'scroll',
          padding: '1rem',
          marginBottom: '1rem',
          backgroundColor: '#f9f9f9',
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: '0.5rem' }}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        style={{ padding: '0.5rem', width: '70%', marginRight: '1rem' }}
      />
      <button onClick={sendMessage} style={{ padding: '0.5rem 1rem' }}>
        Send
      </button>
    </div>
  );
};

export default ChatPage;

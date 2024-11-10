import React, { useState } from 'react';
import styled from 'styled-components';
import ChatMessage from './ChatMessage';
import { sendMessageToGrok } from '../services/grokApi';

const ChatContainer = styled.div`
  width: 80%;
  max-width: 800px;
  height: 80vh;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 20px;
  border-top: 1px solid #eee;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    setError(null);
    setIsLoading(true);

    const userMessage = {
      text: inputValue,
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');

    try {
      const response = await sendMessageToGrok(inputValue);
      const grokMessage = {
        text: response.content,
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      setMessages(prevMessages => [...prevMessages, grokMessage]);
    } catch (error) {
      console.error('Error sending message to Grok:', error);
      setError('Failed to get response from Grok. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isLoading && <div style={{ textAlign: 'center', padding: '10px' }}>Loading...</div>}
        {error && <div style={{ color: 'red', textAlign: 'center', padding: '10px' }}>{error}</div>}
      </MessagesContainer>
      <InputContainer>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <SendButton onClick={handleSend} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
}

export default ChatInterface; 
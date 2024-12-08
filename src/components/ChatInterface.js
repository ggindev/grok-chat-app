import React, { useState } from 'react';
import styled from 'styled-components';
import ChatMessage from './ChatMessage';
import { sendMessageToGrok } from '../services/grokApi';

const ChatContainer = styled.div`
  width: 80%;
  height: 95vh;
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
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
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 5px;
  margin-right: 10px;
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};

  &::placeholder {
    color: ${props => props.theme.colors.secondary};
  }
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

function ChatInterface({ messages, onMessagesUpdate }) {
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
      id: Date.now().toString(),
      versions: [],
      isEdited: false
    };

    const newMessages = [...messages, userMessage];
    onMessagesUpdate(newMessages);
    setInputValue('');

    try {
      const response = await sendMessageToGrok(inputValue, messages);
      const grokMessage = {
        text: response.content,
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      onMessagesUpdate([...newMessages, grokMessage]);
    } catch (error) {
      console.error('Error sending message to Grok:', error);
      setError('Failed to get response from Grok. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessageEdit = async (editedMessage) => {
    try {
      setIsLoading(true);
      
      // Find the index of the edited message
      const editedIndex = messages.findIndex(msg => msg.id === editedMessage.id);
      
      // Keep all messages up to and including the edited message
      const previousMessages = messages.slice(0, editedIndex);
      
      if (editedMessage.currentVersionIndex !== undefined) {
        // For version switching: show corresponding subsequent messages if they exist
        const versionTimestamp = editedMessage.timestamp;
        const subsequentMessages = messages.slice(editedIndex + 1).filter(msg => 
          new Date(msg.timestamp) > new Date(versionTimestamp)
        );
        
        onMessagesUpdate([
          ...previousMessages, 
          editedMessage,
          ...subsequentMessages
        ]);
        setIsLoading(false);
        return;
      }
      
      // For new edits: keep previous messages and get new response
      const updatedMessages = [...previousMessages, editedMessage];
      onMessagesUpdate(updatedMessages);

      // Get a new response from Grok based on the edited message
      const response = await sendMessageToGrok(editedMessage.text, updatedMessages);
      const grokMessage = {
        text: response.content,
        isUser: false,
        timestamp: new Date().toISOString(),
        id: Date.now().toString()
      };

      // Store original subsequent messages for reference
      const subsequentMessages = messages.slice(editedIndex + 1).map(msg => ({
        ...msg,
        isAlternateTimeline: true // Mark these as from alternate timeline
      }));

      // Update with the new Grok response and keep subsequent messages
      onMessagesUpdate([
        ...updatedMessages, 
        grokMessage,
        ...subsequentMessages
      ]);
    } catch (error) {
      console.error('Error updating conversation after edit:', error);
      setError('Failed to update conversation after edit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((message, index) => (
          <ChatMessage 
            key={message.id || index} 
            message={message} 
            onEdit={handleMessageEdit}
          />
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
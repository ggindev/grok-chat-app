import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  margin-bottom: 10px;
`;

const MessageBubble = styled.div`
  background-color: ${props => props.$isUser ? '#007bff' : '#e9ecef'};
  color: ${props => props.$isUser ? 'white' : 'black'};
  padding: 10px 15px;
  border-radius: 15px;
  max-width: 70%;

  & p {
    margin: 0;
  }
  
  & code {
    background-color: ${props => props.$isUser ? '#0056b3' : '#d1d5db'};
    padding: 2px 4px;
    border-radius: 4px;
  }

  & pre {
    background-color: ${props => props.$isUser ? '#0056b3' : '#d1d5db'};
    padding: 8px;
    border-radius: 4px;
    overflow-x: auto;
  }
`;

function ChatMessage({ message }) {
  return (
    <MessageContainer $isUser={message.isUser}>
      <MessageBubble $isUser={message.isUser}>
        <ReactMarkdown>{message.text}</ReactMarkdown>
      </MessageBubble>
    </MessageContainer>
  );
}

export default ChatMessage; 
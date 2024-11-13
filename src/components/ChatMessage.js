import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  margin-bottom: 8px;
  padding: 0 4px;
`;

const MessageBubble = styled.div`
  background-color: ${props => props.$isUser 
    ? props.theme.colors.primary 
    : props.theme.isDarkMode 
      ? props.theme.colors.surface 
      : '#e9ecef'};
  color: ${props => props.$isUser || props.theme.isDarkMode ? 'white' : 'black'};
  padding: 8px 12px;
  border-radius: 12px;
  max-width: 85%;
  font-size: 0.95rem;

  & p {
    margin: 0;
    line-height: 1.4;
  }
  
  & code {
    background-color: ${props => props.$isUser 
      ? '#0056b3' 
      : props.theme.isDarkMode 
        ? '#1a1a1a' 
        : '#d1d5db'};
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 0.9em;
  }

  & pre {
    background-color: ${props => props.$isUser 
      ? '#0056b3' 
      : props.theme.isDarkMode 
        ? '#1a1a1a' 
        : '#d1d5db'};
    padding: 8px;
    border-radius: 4px;
    overflow-x: auto;
    margin: 4px 0;
    
    & code {
      padding: 0;
      background-color: transparent;
    }
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
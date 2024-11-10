import React from 'react';
import styled from 'styled-components';

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
`;

function ChatMessage({ message }) {
  return (
    <MessageContainer $isUser={message.isUser}>
      <MessageBubble $isUser={message.isUser}>
        {message.text}
      </MessageBubble>
    </MessageContainer>
  );
}

export default ChatMessage; 
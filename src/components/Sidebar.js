import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100%;
  background-color: #f8f9fa;
  border-right: 1px solid #dee2e6;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const NewChatButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ChatList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const ChatItem = styled.div`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: ${props => props.$isActive ? '#e9ecef' : 'transparent'};

  &:hover {
    background-color: #e9ecef;
  }
`;

function Sidebar({ chats, activeChatId, onNewChat, onSelectChat }) {
  return (
    <SidebarContainer>
      <NewChatButton onClick={onNewChat}>New Chat</NewChatButton>
      <ChatList>
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            $isActive={chat.id === activeChatId}
            onClick={() => onSelectChat(chat.id)}
          >
            {chat.title || 'New Chat'}
          </ChatItem>
        ))}
      </ChatList>
    </SidebarContainer>
  );
}

export default Sidebar; 
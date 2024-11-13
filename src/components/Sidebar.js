import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100%;
  background-color: ${props => props.theme.colors.surface};
  border-right: 1px solid ${props => props.theme.colors.border};
  padding: 20px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
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

const ChatItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const ChatItem = styled.div`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${props => props.$isActive ? props.theme.colors.hover : 'transparent'};
  color: ${props => props.theme.colors.text};
  flex-grow: 1;
  margin-right: 5px;

  &:hover {
    background-color: ${props => props.theme.colors.hover};
  }
`;

const DeleteButton = styled.button`
  padding: 5px 8px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

function Sidebar({ chats, activeChatId, onNewChat, onSelectChat, onDeleteChat }) {
  return (
    <SidebarContainer>
      <NewChatButton onClick={onNewChat}>New Chat</NewChatButton>
      <ChatList>
        {chats.map((chat) => (
          <ChatItemContainer key={chat.id}>
            <ChatItem
              $isActive={chat.id === activeChatId}
              onClick={() => onSelectChat(chat.id)}
            >
              {chat.title || 'New Chat'}
            </ChatItem>
            {chats.length > 1 && (
              <DeleteButton onClick={() => onDeleteChat(chat.id)}>×</DeleteButton>
            )}
          </ChatItemContainer>
        ))}
      </ChatList>
    </SidebarContainer>
  );
}

export default Sidebar; 
import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  max-height: 100vh;
  background-color: ${props => props.theme.colors.surface};
  border-right: 1px solid ${props => props.theme.colors.border};
  padding: 12px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  z-index: 100;

  @media (max-width: 768px) {
    position: fixed;
    left: ${props => props.$isOpen ? '0' : '-250px'};
    height: 100vh;
    box-shadow: ${props => props.$isOpen ? '0 0 10px rgba(0, 0, 0, 0.1)' : 'none'};
  }
`;

const NewChatButton = styled.button`
  padding: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 12px;
  font-size: 0.9rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const ChatList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin-right: -4px;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border};
    border-radius: 4px;
  }
`;

const ChatItemContainer = styled.div`
  position: relative;
  margin-bottom: 4px;
`;

const ChatItem = styled.div`
  padding: 8px 10px;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${props => props.$isActive ? props.theme.colors.hover : 'transparent'};
  color: ${props => props.theme.colors.text};
  width: 100%;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: ${props => props.theme.colors.hover};
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  padding: 4px 6px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease;
  font-size: 0.8rem;

  ${ChatItemContainer}:hover & {
    opacity: 0.8;
  }

  &:hover {
    opacity: 1 !important;
  }
`;

const Overlay = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 90;
  }
`;

function Sidebar({ chats, activeChatId, onNewChat, onSelectChat, onDeleteChat, isOpen, onClose }) {
  return (
    <>
      <SidebarContainer $isOpen={isOpen}>
        <NewChatButton onClick={onNewChat}>New Chat</NewChatButton>
        <ChatList>
          {chats.map(chat => (
            <ChatItemContainer key={chat.id}>
              <ChatItem
                $isActive={chat.id === activeChatId}
                onClick={() => {
                  onSelectChat(chat.id);
                  if (window.innerWidth <= 768) {
                    onClose();
                  }
                }}
              >
                {chat.title}
              </ChatItem>
              {chats.length > 1 && (
                <DeleteButton onClick={() => onDeleteChat(chat.id)}>×</DeleteButton>
              )}
            </ChatItemContainer>
          ))}
        </ChatList>
      </SidebarContainer>
      <Overlay $isOpen={isOpen} onClick={onClose} />
    </>
  );
}

export default Sidebar; 
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChatInterface from './components/ChatInterface';
import Sidebar from './components/Sidebar';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import SettingsModal from './components/SettingsModal';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  transition: all 0.3s ease;
  position: relative;
`;

const MenuButton = styled.button`
  display: none;
  position: fixed;
  left: 10px;
  top: 10px;
  z-index: 1000;
  padding: 8px;
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  cursor: pointer;
  color: ${props => props.theme.colors.text};

  @media (max-width: 768px) {
    display: block;
  }
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const SettingsButton = styled.button`
  position: absolute;
  top: 20px;
  right: 70px;
  padding: 10px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.hover};
  }
`;

function App() {
  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem('chats');
    return savedChats ? JSON.parse(savedChats) : [{ id: '1', messages: [], title: 'New Chat' }];
  });
  const [activeChatId, setActiveChatId] = useState(() => {
    return chats[0]?.id || '1';
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  const handleNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      messages: [],
      title: 'New Chat'
    };
    setChats([...chats, newChat]);
    setActiveChatId(newChat.id);
  };

  const updateChatMessages = (chatId, messages) => {
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId 
          ? { ...chat, messages, title: messages[0]?.text.slice(0, 30) || 'New Chat' }
          : chat
      )
    );
  };

  const activeChat = chats.find(chat => chat.id === activeChatId) || chats[0];

  const handleDeleteChat = (chatId) => {
    const newChats = chats.filter(chat => chat.id !== chatId);
    setChats(newChats);
    
    // If the active chat is being deleted, switch to another chat
    if (chatId === activeChatId) {
      const newActiveChatId = newChats[0]?.id;
      setActiveChatId(newActiveChatId);
    }
  };

  return (
    <ThemeProvider>
      <AppContainer>
        <MenuButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? '✕' : '☰'}
        </MenuButton>
        <Sidebar
          chats={chats}
          activeChatId={activeChatId}
          onNewChat={handleNewChat}
          onSelectChat={setActiveChatId}
          onDeleteChat={handleDeleteChat}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <MainContent>
          <SettingsButton onClick={() => setIsSettingsOpen(true)}>⚙️</SettingsButton>
          <ThemeToggle />
          <ChatInterface
            messages={activeChat.messages}
            onMessagesUpdate={(messages) => updateChatMessages(activeChatId, messages)}
          />
        </MainContent>
        <SettingsModal 
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App; 
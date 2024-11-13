import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChatInterface from './components/ChatInterface';
import Sidebar from './components/Sidebar';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

function App() {
  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem('chats');
    return savedChats ? JSON.parse(savedChats) : [{ id: '1', messages: [], title: 'New Chat' }];
  });
  const [activeChatId, setActiveChatId] = useState(() => {
    return chats[0]?.id || '1';
  });

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

  return (
    <AppContainer>
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={setActiveChatId}
      />
      <MainContent>
        <ChatInterface
          messages={activeChat.messages}
          onMessagesUpdate={(messages) => updateChatMessages(activeChatId, messages)}
        />
      </MainContent>
    </AppContainer>
  );
}

export default App; 
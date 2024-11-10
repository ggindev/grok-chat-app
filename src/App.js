import React from 'react';
import styled from 'styled-components';
import ChatInterface from './components/ChatInterface';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

function App() {
  return (
    <AppContainer>
      <ChatInterface />
    </AppContainer>
  );
}

export default App; 
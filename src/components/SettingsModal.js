import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${props => props.theme.colors.surface};
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

const Button = styled.button`
  padding: 8px 16px;
  margin: 0 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.$primary ? '#007bff' : '#6c757d'};
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

function SettingsModal({ isOpen, onClose }) {
  const [apiKey, setApiKey] = useState(localStorage.getItem('grokApiKey') || '');

  const handleSave = () => {
    localStorage.setItem('grokApiKey', apiKey);
    onClose();
    window.location.reload(); // Reload to reinitialize the API client
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>Settings</h2>
        <div>
          <label>X API Key:</label>
          <Input
            type="password"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="Enter your X API key"
          />
        </div>
        <div style={{ textAlign: 'right', marginTop: '20px' }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button $primary onClick={handleSave}>Save</Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
}

export default SettingsModal; 
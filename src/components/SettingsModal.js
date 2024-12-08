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

const ExportButton = styled(Button)`
  background-color: #28a745;
  margin-bottom: 20px;
  width: 100%;
`;

function SettingsModal({ isOpen, onClose }) {
  const [apiKey, setApiKey] = useState(localStorage.getItem('grokApiKey') || '');

  const handleSave = () => {
    localStorage.setItem('grokApiKey', apiKey);
    onClose();
    window.location.reload(); // Reload to reinitialize the API client
  };

  const handleExport = () => {
    try {
      // Get chat history from localStorage
      const chats = JSON.parse(localStorage.getItem('chats') || '[]');
      
      // Create a Blob with the chat data
      const blob = new Blob([JSON.stringify(chats, null, 2)], { type: 'application/json' });
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `grok-chat-history-${new Date().toISOString().split('T')[0]}.json`;
      
      // Trigger download
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to export chat history:', error);
      alert('Failed to export chat history. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>Settings</h2>
        <ExportButton onClick={handleExport}>
          Export Chat History
        </ExportButton>
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
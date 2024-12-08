import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  margin-bottom: 8px;
  padding: 0 4px;
`;

const MessageBubble = styled.div`
  position: relative;
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

  ${props => props.message?.isAlternateTimeline && `
    opacity: 0.7;
    &::before {
      content: '↯';
      position: absolute;
      left: -20px;
      color: ${props.theme.colors.secondary};
    }
  `}
`;

const CopyButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  padding: 4px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
  color: ${props => props.$isUser || props.theme.isDarkMode ? 'white' : 'black'};
  border-radius: 4px;

  ${MessageBubble}:hover & {
    opacity: 0.7;
  }

  &:hover {
    opacity: 1 !important;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const EditButton = styled(CopyButton)`
  right: 32px;
`;

const EditInput = styled.textarea`
  width: 100%;
  padding: 8px;
  margin: 4px 0;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  resize: vertical;
`;

const VersionControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  font-size: 0.8rem;
  opacity: 0.7;
`;

const VersionButton = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 3px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function ChatMessage({ message, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(message.text);
  const [currentVersionIndex, setCurrentVersionIndex] = useState(0);

  const allVersions = [
    { text: message.text, timestamp: message.timestamp },
    ...(message.versions || [])
  ];
  
  const handleVersionChange = (index) => {
    const selectedVersion = allVersions[index];
    if (!selectedVersion) return;

    setCurrentVersionIndex(index);
    setEditValue(selectedVersion.text);

    onEdit({
      ...message,
      text: selectedVersion.text,
      timestamp: selectedVersion.timestamp,
      currentVersionIndex: index,
      versions: message.versions
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleEdit = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    if (editValue !== message.text) {
      const updatedMessage = {
        ...message,
        text: editValue,
        versions: [
          { text: message.text, timestamp: message.timestamp },
          ...(message.versions || [])
        ],
        timestamp: new Date().toISOString(),
        isEdited: true
      };

      onEdit(updatedMessage);
      setCurrentVersionIndex(0);
    }
    
    setIsEditing(false);
  };

  return (
    <MessageContainer $isUser={message.isUser}>
      <MessageBubble $isUser={message.isUser} message={message}>
        <CopyButton 
          onClick={handleCopy} 
          $isUser={message.isUser}
          title="Copy message"
        >
          📋
        </CopyButton>
        {message.isUser && (
          <EditButton
            onClick={handleEdit}
            $isUser={message.isUser}
            title={isEditing ? "Save edit" : "Edit message"}
          >
            {isEditing ? "💾" : "✏️"}
          </EditButton>
        )}
        {isEditing ? (
          <EditInput
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleEdit()}
          />
        ) : (
          <>
            <ReactMarkdown>{message.text}</ReactMarkdown>
            {message.isEdited && (
              <>
                <small style={{ opacity: 0.7 }}>(edited)</small>
                {allVersions.length > 1 && (
                  <VersionControls>
                    <VersionButton
                      onClick={() => handleVersionChange(Math.min(allVersions.length - 1, currentVersionIndex + 1))}
                      disabled={currentVersionIndex >= allVersions.length - 1}
                      title="Previous version"
                    >
                      ◀
                    </VersionButton>
                    <span>
                      Version {allVersions.length - currentVersionIndex}/{allVersions.length}
                    </span>
                    <VersionButton
                      onClick={() => handleVersionChange(Math.max(0, currentVersionIndex - 1))}
                      disabled={currentVersionIndex <= 0}
                      title="Next version"
                    >
                      ▶
                    </VersionButton>
                  </VersionControls>
                )}
              </>
            )}
          </>
        )}
      </MessageBubble>
    </MessageContainer>
  );
}

export default ChatMessage; 
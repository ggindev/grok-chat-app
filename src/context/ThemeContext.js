import React, { createContext, useState, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = {
    isDarkMode,
    colors: isDarkMode ? {
      background: '#1a1a1a',
      surface: '#2d2d2d',
      text: '#ffffff',
      primary: '#007bff',
      secondary: '#6c757d',
      border: '#404040',
      hover: '#404040'
    } : {
      background: '#f5f5f5',
      surface: '#ffffff',
      text: '#000000',
      primary: '#007bff',
      secondary: '#6c757d',
      border: '#dee2e6',
      hover: '#e9ecef'
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 
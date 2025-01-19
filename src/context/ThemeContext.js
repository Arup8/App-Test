import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const themes = {
  light: {
    background: '#FFFFFF',
    cardBackground: '#FFFFFF',
    text: '#000000',
    primary: '#4CAF50',
    secondary: '#2196F3',
    error: '#f44336',
    border: '#E0E0E0',
    inputBackground: '#F5F5F5',
    inputText: '#000000',
    placeholderText: '#9E9E9E',
  },
  dark: {
    background: '#121212',
    cardBackground: '#1E1E1E',
    text: '#FFFFFF',
    primary: '#81C784',
    secondary: '#64B5F6',
    error: '#E57373',
    border: '#333333',
    inputBackground: '#333333',
    inputText: '#FFFFFF',
    placeholderText: '#9E9E9E',
  },
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = {
    isDarkMode,
    colors: isDarkMode ? themes.dark : themes.light,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

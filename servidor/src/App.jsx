import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

// Definir el tema
const theme = extendTheme({
  colors: {
    brand: {
      50: '#e6f1ff',
      100: '#b8d5ff',
      200: '#8ab9ff',
      300: '#5c9dff',
      400: '#2e81ff',
      500: '#0065e6',
      600: '#0050b4',
      700: '#003b82',
      800: '#002651',
      900: '#001021',
    },
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
      },
    }),
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
    </ChakraProvider>
  );
}

export default App;

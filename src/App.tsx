import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, Switch, Typography } from '@mui/material';
import Board from './components/Board';
import { loadBoard, saveBoard } from './utils/localStorage';
import { Column } from './types';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    background: { default: '#f5f5f5', paper: '#ffffff' },
    text: { primary: '#000000' },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    background: { default: '#121212', paper: '#1e1e1e' },
    text: { primary: '#ffffff' },
  },
});

const App: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(loadBoard);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    saveBoard(columns);
  }, [columns]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
          <Typography variant="h4">Task Card</Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body1">Dark Mode</Typography>
            <Switch checked={isDarkMode} onChange={toggleTheme} />
          </Box>
        </Box>

        <Box
          sx={{
            overflowX: 'auto', 
            overflowY: 'hidden',
          }}
        >
          <Board columns={columns} setColumns={setColumns} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, Typography, IconButton } from '@mui/material';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Board from './components/Board';
import Login from './Login';
import Register from './Register';
import { loadBoard, saveBoard } from './utils/localStorage';
import { Column } from './types';
import logo from './assets/logo2.png';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

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
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
            <Box display="flex" alignItems="center">
              <img src={logo} alt="Logo" style={{ width: 40, height: 40, marginRight: 8 }} />
              <Typography variant="h4" color='#1fbdd2'>Task Card</Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <IconButton onClick={toggleTheme} aria-label="Switch to light mode">
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ overflowX: 'auto', overflowY: 'hidden' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/board" element={<Board columns={columns} setColumns={setColumns} />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;

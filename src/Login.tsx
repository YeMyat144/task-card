// Login.tsx
import React, { useState } from 'react';
import { Container, Box, Button, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (email === storedEmail && password === storedPassword) {
      setError('');
      navigate('/board'); // Redirect to the main board after login
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <Container>
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Typography variant="h5">Login</Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Button variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2 }}>
        Login
      </Button>
      <Link href="/register" variant="body2" sx={{ mt: 2 }}>
        Don't have an account? Register
      </Link>
    </Box>
    </Container>
  );
};

export default Login;

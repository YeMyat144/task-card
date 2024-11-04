import React, { useState } from 'react';
import { Container, Box, Button, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Implement your login logic here
    console.log("Logging in with", email, password);
    // Navigate to the board after login
    navigate('/');
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

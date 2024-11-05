import React, { useState } from 'react';
import { Container, Box, Button, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
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

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    // Save new user's email and password to localStorage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    setError('');
    setIsLogin(true); // Switch to login view after successful registration
  };

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography variant="h5">{isLogin ? 'Login' : 'Register'}</Typography>
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
        {!isLogin && (
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
        )}
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={isLogin ? handleLogin : handleRegister}
          sx={{ mt: 2 }}
        >
          {isLogin ? 'Login' : 'Register'}
        </Button>
        <Link
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
          }}
          variant="body2"
          sx={{ mt: 2, cursor: 'pointer' }}
        >
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </Link>
      </Box>
    </Container>
  );
};

export default Login;

import React, { useState } from 'react';
import { Container, Box, Button, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (email && name && password) {
      // Save the user details to localStorage
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', name);
      localStorage.setItem('userPassword', password);
      setError('');
      navigate('/login'); // Redirect to login after registration
    } else {
      setError('All fields are required');
    }
  };

  return (
    <Container>
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Typography variant="h5">Register</Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
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
      <Button variant="contained" color="primary" onClick={handleRegister} sx={{ mt: 2 }}>
        Register
      </Button>
      <Link href="/login" variant="body2" sx={{ mt: 2 }}>
        Already have an account? Login
      </Link>
    </Box>
    </Container>
  );
};

export default Register;

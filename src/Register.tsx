import React, { useState } from 'react';
import { Container, Box, Button, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    // Implement your registration logic here
    console.log("Registering with", email, password);
    // Navigate to the login page after registration
    navigate('/login');
  };

  return (
    <Container>
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Typography variant="h5">Register</Typography>
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
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
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

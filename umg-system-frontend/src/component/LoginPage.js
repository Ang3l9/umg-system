import React, { useState } from 'react';
import axios from 'axios';
import {Button,TextField,Box, Card} from '@mui/material';
import { API_BASE_URL } from '../config/apiConfig'; // Import the base URL


function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const url = `${API_BASE_URL}/api/v1/usuario/get?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
      const response = await axios.get(url);
      const userData = response.data;
      onLogin(userData);

    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Card className='login-container'>
      <div className="login-form">
        <h2>Ingresar</h2>
        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 4, width: '30ch' } }}
            noValidate
            autoComplete="off"
        >
          <div>
          <TextField className="input-container" type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
          <TextField className="input-container" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button variant="contained"  type = "button" onClick={handleLogin}>Ingresar</Button>
        </Box>
      </div>
      </Card>
  );
}

export default LoginPage;

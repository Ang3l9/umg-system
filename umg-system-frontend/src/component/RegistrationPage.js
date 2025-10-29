import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import {Button,TextField,Box, Card} from '@mui/material';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/apiConfig'; // Import the base URL


function RegistrationPage() {
  const [usuNombre, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [correo, setEmail] = useState('');
  const [dob, setBirthDate] = useState('');
  const [contrasena, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegistration = async () => {
    try {
      const userData = {
        usuNombre,
        lastname,
        correo,
        dob,
        contrasena
      };

      const response = await axios.post( `${API_BASE_URL}/api/v1/usuario/add`, userData);
      console.log('User registered:', response.data);

    } catch (error) {
      console.error('Registration error:', error);
    }
    setRegistrationSuccess(true);
  };

  if (registrationSuccess) {
    return (
    <div className='centered-container'>
      <div className="login-container">
      <h1>Completado</h1>
      <h2> </h2>
      <div className="registration-link">
        <p>Regresar <a href="/">Ingresar</a></p>
      </div>
      </div>

    </div>);
  }

  return (
    <div className="centered-container">
    <Card className="login-container">
      <h2>Registro</h2>
      <div className="input-container">
        <TextField type="text" placeholder="Nombre" value={usuNombre} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div className="input-container">
        <TextField type="text" placeholder="Apellido" value={lastname} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div className="input-container">
        <TextField type="email" placeholder="Correo" value={correo} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="input-container">
        <TextField type="password" placeholder="Password" value={contrasena} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button variant="contained"  className="login-button" onClick={handleRegistration}>Registrar</Button>
      <div className="login-link">
        <p className='registration-link'><Link to="/">Iniciar Sesión</Link></p>
      </div>
    </Card>
    </div>
  );
}

export default RegistrationPage;


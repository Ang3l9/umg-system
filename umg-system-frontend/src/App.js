import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LoginPage from './component/LoginPage';
import HomePage from './component/HomePage';
import RegistrationPage from './component/RegistrationPage';

const theme = createTheme({
  palette: {
    primary: {
      light: '#7e57c2',
      main: '#5e35b1',
      dark: '#4527a0',
      contrastText: '#fff',
    },
    secondary: {
      light: '#b39ddb',
      main: '#9575cd',
      dark: '#7e57c2',
      contrastText: '#fff',
    },
  },
});

function App() {
  const [user, setUser] = useState('');

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser('');
  };

  return (
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <div>
              {!user && <Register />}
            </div>
            <Routes>
              <Route
                  path="/"
                  element={
                    !user ? (
                        <LoginPage onLogin={handleLogin} />
                    ) : (
                        <HomePage user={user} onLogout={handleLogout} />
                    )
                  }
              />
              <Route path="/register" element={<RegistrationPage />} />
              {/* Ruta base para HomePage */}
              <Route path="/home/*" element={<HomePage user={user} onLogout={handleLogout} />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
  );
}

function Register() {
  const location = useLocation();
  if (location.pathname !== '/register') {
    return (
        <p>
          No tienes cuenta? <Link to="/register" style={{ color: '#5e35b1' }}> Haz clic para crear</Link>
        </p>
    );
  }
  return null;
}

export default App;
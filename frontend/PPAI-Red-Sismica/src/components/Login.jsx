// Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from '../api';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsuario] = useState('');
  const [password, setClave] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const estaLogueado = localStorage.getItem('logueado');
    if (estaLogueado === 'true') {
      navigate('/menu');
    }
  }, [navigate]);

  const manejarLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/auth/login', { username, password });

      if (res.data.success) {
        localStorage.setItem('logueado', 'true');
        navigate('/menu');
      } else {
        setError('Credenciales inválidas');
      }
    } catch (err) {
      console.error('Error en el login:', err);
      setError('Ocurrió un error al iniciar sesión');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={manejarLogin}>
        <h2>Iniciar Sesión</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;

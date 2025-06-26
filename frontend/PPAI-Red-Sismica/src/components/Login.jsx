// Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  // ✅ Si ya está logueado, redirigimos automáticamente
  useEffect(() => {
    const estaLogueado = localStorage.getItem('logueado');
    if (estaLogueado === 'true') {
      navigate('/menu');
    }
  }, [navigate]);

  const manejarLogin = (e) => {
    e.preventDefault();

    // ✅ Usuario y contraseña correctos
    if (usuario === 'admin' && clave === '1234') {
      localStorage.setItem('logueado', 'true'); // marcamos como logueado
      navigate('/menu');
    } else {
      setError('Usuario o contraseña incorrectos');
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

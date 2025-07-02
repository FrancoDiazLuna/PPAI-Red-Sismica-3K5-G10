import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from '../api';

const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contraseña, setClave] = useState('');
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
      const res = await axios.post('/auth/login', {
        username: usuario,
        password: contraseña,
      });

      if (res.data.success) {
        const { access_token, usuario, sesion } = res.data;

        // ✅ Guardamos los datos importantes en localStorage
        localStorage.setItem('logueado', 'true');
        localStorage.setItem('token', access_token);
        localStorage.setItem('usuarioId', usuario.id);
        localStorage.setItem('username', usuario.username);
        localStorage.setItem('nombreCompleto', `${usuario.nombre} ${usuario.apellido}`);
        localStorage.setItem('rol', usuario.rol);
        localStorage.setItem('sesionId', sesion.id);
        localStorage.setItem('fechaHoraInicio', sesion.fechaHoraInicio);

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

        <div className="input-icon">
          <span className="icon">👤</span>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>

        <div className="input-icon">
          <span className="icon">🔒</span>
          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setClave(e.target.value)}
          />
        </div>

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;

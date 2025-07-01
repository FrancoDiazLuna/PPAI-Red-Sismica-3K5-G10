import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClipboardList, FaLock } from 'react-icons/fa';
import './PantallaPrincipal.css';

const PantallaPrincipal = () => {
  const navigate = useNavigate();

  return (
    <div className="inicio-container">
      <div className="logo">
        <img src="/public/EstacionSismologica.png" alt="Logo" width={100} height={100}/>
      </div>

      <div className="titulo">
        <h1>Centro De Control De Red Sísmica</h1>
      </div>

      <div className="botones">
        <button onClick={() => navigate('/ordenes')}>
          <FaClipboardList className="icono" />
          Ver Órdenes
        </button>
        <button onClick={() => navigate('/cerrar')}>
          <FaLock className="icono" />
          Cerrar Orden
        </button>
          <button onClick={() => {
              localStorage.removeItem('logueado');
              window.location.href = '/';
            }}>
              Cerrar Sesión
    </button>
      </div>
    </div>
  );
};

export default PantallaPrincipal;

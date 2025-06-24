import React from 'react';
import imagenPrincipal from '../assets/imagenPrincipal.png';

export default function MainScreen() {
  return (
    <div className="main-container">
      <div className="globe-section">
        <div className="logo-overlay">
          <h1 className='titulo-central'>Centro De Control De Red Sísmica</h1>
        </div>
        <img src={imagenPrincipal} alt="Globo terráqueo"/>
      </div>

      <div className="button-section">
        <button className="primary-button">- Ver Órdenes de Inspección -</button>
        <button className="secondary-button">- Cerrar Orden de Inspección -</button>
      </div>
    </div>
  );
}
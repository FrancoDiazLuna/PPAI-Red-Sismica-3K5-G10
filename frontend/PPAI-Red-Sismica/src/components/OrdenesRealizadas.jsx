// ✅ OrdenesRealizadas.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrdenesRealizadas.css';

const OrdenesRealizadas = () => {
  const navigate = useNavigate();

  const datos = [
    {
      id: '001',
      orden: 'ORD-1001',
      estacion: 'Estación Norte',
      fechaFinalizacion: '2025-06-24',
    },
    {
      id: '002',
      orden: 'ORD-1002',
      estacion: 'Estación Sur',
      fechaFinalizacion: '2025-06-23',
    },
  ];

  const seleccionarOrden = (orden) => {
    navigate('/motivos', { state: { ordenSeleccionada: orden } });
  };

  return (
    <div className="ordenes-container">
      <h1 className="ordenes-title">Órdenes de Inspección</h1>
      <div className="tabla-wrapper">
        <table className="ordenes-tabla">
          <thead>
            <tr>
              <th>ID Sismógrafo</th>
              <th>Número De Orden</th>
              <th>Estación</th>
              <th>Fecha Finalización</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((dato, index) => (
              <tr key={index}>
                <td>{dato.id}</td>
                <td>{dato.orden}</td>
                <td>{dato.estacion}</td>
                <td>{dato.fechaFinalizacion}</td>
                <td><button onClick={() => seleccionarOrden(dato)}>Seleccionar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdenesRealizadas;
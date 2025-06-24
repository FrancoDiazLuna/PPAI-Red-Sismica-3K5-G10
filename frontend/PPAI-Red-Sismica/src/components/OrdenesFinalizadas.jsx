import React from 'react';
import './OrdenesInspeccion.css';

const OrdenesInspeccion = () => {
  // Datos simulados por ahora
  const datos = [
    {
      id: '001',
      orden: 'ORD-1234',
      estacion: 'Estación Norte',
      fecha: '2025-06-23',
      hora: '14:30',
      estado: 'Activo',
    },
    {
      id: '002',
      orden: 'ORD-5678',
      estacion: 'Estación Sur',
      fecha: '2025-06-22',
      hora: '11:15',
      estado: 'Fuera de servicio',
    },
  ];

  return (
    <div className="ordenes-container">
      <h1 className="ordenes-title">Órdenes De Inspección</h1>
      <div className="tabla-wrapper">
        <table className="ordenes-tabla">
          <thead>
            <tr>
              <th>ID Sismógrafo</th>
              <th>Número De Orden</th>
              <th>Estación Sismológica</th>
              <th>Fecha De Cierre</th>
              <th>Hora De Cierre</th>
              <th>Estado Sismógrafo</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((dato, index) => (
              <tr key={index}>
                <td data-label="ID Sismógrafo">{dato.id}</td>
                <td data-label="Número De Orden">{dato.orden}</td>
                <td data-label="Estación Sismológica">{dato.estacion}</td>
                <td data-label="Fecha De Cierre">{dato.fecha}</td>
                <td data-label="Hora De Cierre">{dato.hora}</td>
                <td data-label="Estado Sismógrafo">{dato.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdenesInspeccion;

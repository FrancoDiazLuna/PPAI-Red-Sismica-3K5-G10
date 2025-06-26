import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrdenesFinalizadas.css';

const OrdenesFinalizadas = () => {
  const [ordenes, setOrdenes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem("ordenesConfirmadas")) || [];
    setOrdenes(guardadas);
  }, []);

  const eliminarOrden = (index) => {
    const confirmacion = window.confirm("¿Estás seguro que deseas eliminar esta orden?");
    if (!confirmacion) return;

    const nuevasOrdenes = [...ordenes];
    nuevasOrdenes.splice(index, 1);
    setOrdenes(nuevasOrdenes);
    localStorage.setItem("ordenesConfirmadas", JSON.stringify(nuevasOrdenes));
  };

  return (
    <div className="ordenes-container">
      <h1 className="ordenes-title">Órdenes Finalizadas</h1>
      <div className="tabla-wrapper">
        <table className="ordenes-tabla">
          <thead>
            <tr>
              <th>Número de Orden</th>
              <th>Estación</th>
              <th>Fecha de Cierre</th>
              <th>Hora de Cierre</th>
              <th>Estado</th>
              <th>Observaciones</th>
              <th>Motivos</th>
              <th>Comentarios</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden, i) => (
              <tr key={i}>
                <td>{orden.orden.orden}</td>
                <td>{orden.orden.estacion}</td>
                <td>{orden.orden.fechaCierre || orden.fecha}</td>
                <td>{orden.orden.horaCierre || orden.hora}</td>
                <td style={{ color: 'red', fontWeight: 'bold' }}>{orden.orden.estado || 'Fuera de Servicio'}</td>
                <td>{orden.observaciones}</td>
                <td>
                  <ul>
                    {orden.motivos.map((m, j) => (
                      <li key={j}>{m.tipo}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {orden.motivos.map((m, j) => (
                      <li key={j}>{m.comentario}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <button onClick={() => eliminarOrden(i)} className="boton-eliminar">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="siguiente-wrapper">
        <button className="boton-volver" onClick={() => navigate('/')}>Volver al Menú</button>
      </div>
    </div>
  );
};

export default OrdenesFinalizadas;

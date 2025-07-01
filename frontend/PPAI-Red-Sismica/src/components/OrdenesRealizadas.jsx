// ✅ OrdenesRealizadas.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrdenesRealizadas.css';
import axios from '../api';

const OrdenesRealizadas = () => {
  const navigate = useNavigate();
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerOrdenes = async () => {
      try {
        const res = await axios.get('/api/ordenes-activas'); 
        setDatos(res.data);
      } catch (error) {
        console.error("Error al obtener las órdenes activas:", error);
        alert("No se pudieron cargar las órdenes.");
      } finally {
        setCargando(false);
      }
    };

    obtenerOrdenes();
  }, []);

  const seleccionarOrden = (orden) => {
    navigate('/motivos', { state: { ordenSeleccionada: orden } });
  };

  if (cargando) return <p>Cargando órdenes...</p>;

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
                <td>
                  <button onClick={() => seleccionarOrden(dato)}>Seleccionar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Botón Volver al Menú */}
      <div className="siguiente-wrapper">
        <button className="boton-volver" onClick={() => navigate('/')}>
          Volver al Menú
        </button>
      </div>
    </div>
  );
};

export default OrdenesRealizadas;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Motivos.css';

const Motivos = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const ordenSeleccionada = location.state?.ordenSeleccionada;

  const [observaciones, setObservaciones] = useState("");
  const [motivos, setMotivos] = useState([
    { tipo: "Falla Eléctrica", seleccionado: false, comentario: "" },
    { tipo: "Problema de Software", seleccionado: false, comentario: "" },
    { tipo: "Desgaste Mecánico", seleccionado: false, comentario: "" },
  ]);

  const handleSeleccion = (index) => {
    const nuevos = [...motivos];
    nuevos[index].seleccionado = !nuevos[index].seleccionado;
    setMotivos(nuevos);
  };

  const handleComentario = (index, value) => {
    const nuevos = [...motivos];
    nuevos[index].comentario = value;
    setMotivos(nuevos);
  };

  const confirmarMotivos = () => {
    const motivosSeleccionados = motivos.filter(
      (m) => m.seleccionado && m.comentario.trim() !== ""
    );

    if (!observaciones.trim() || motivosSeleccionados.length === 0) {
      alert("Debes ingresar una observación y al menos un motivo con comentario.");
      return;
    }

    const ahora = new Date();
    const horaActual = ahora.toLocaleTimeString();
    const fechaActual = ahora.toLocaleDateString();

    const ordenConfirmada = {
      orden: {
        ...ordenSeleccionada,
        fechaCierre: fechaActual,
        horaCierre: horaActual,
        estado: "Fuera de Servicio", // ✅ ESTADO
      },
      observaciones,
      motivos: motivosSeleccionados,
    };

    const almacenadas = JSON.parse(localStorage.getItem("ordenesConfirmadas")) || [];
    almacenadas.push(ordenConfirmada);
    localStorage.setItem("ordenesConfirmadas", JSON.stringify(almacenadas));

    navigate('/ordenes');
  };

  return (
    <div className="motivos-container">
      <h2>Motivos de la Orden: {ordenSeleccionada?.orden}</h2>

      <div>
        <label><strong>Observaciones:</strong></label>
        <textarea
          placeholder="Observaciones..."
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
        ></textarea>
      </div>

      <table>
        <thead>
          <tr>
            <th>Seleccionar</th>
            <th>Motivo</th>
            <th>Comentario</th>
          </tr>
        </thead>
        <tbody>
          {motivos.map((m, i) => (
            <tr key={i}>
              <td>
                <input
                  type="checkbox"
                  checked={m.seleccionado}
                  onChange={() => handleSeleccion(i)}
                />
              </td>
              <td>{m.tipo}</td>
              <td>
                {m.seleccionado && (
                  <input
                    type="text"
                    value={m.comentario}
                    onChange={(e) => handleComentario(i, e.target.value)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={confirmarMotivos}>Confirmar</button>
      </div>
    </div>
  );
};

export default Motivos;

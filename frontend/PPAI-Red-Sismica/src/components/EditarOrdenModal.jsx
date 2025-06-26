import React, { useState } from 'react';
import './EditarOrdenModal.css';

const EditarOrdenModal = ({ orden, onClose, onGuardar }) => {
  const [nuevasObservaciones, setNuevasObservaciones] = useState(orden.observaciones || "");
  const [nuevosComentarios, setNuevosComentarios] = useState(
    orden.motivos?.map(m => m.comentario) || []
  );

  const handleComentarioChange = (index, value) => {
    const nuevos = [...nuevosComentarios];
    nuevos[index] = value;
    setNuevosComentarios(nuevos);
  };

  const handleGuardar = () => {
    const motivosActualizados = orden.motivos.map((m, i) => ({
      ...m,
      comentario: nuevosComentarios[i] || "",
    }));

    onGuardar({
      ...orden,
      observaciones: nuevasObservaciones,
      motivos: motivosActualizados,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <h2>Editar Orden: {orden.orden.orden}</h2>

        <label>Observaciones:</label>
        <textarea
          value={nuevasObservaciones}
          onChange={(e) => setNuevasObservaciones(e.target.value)}
        />

        <h4>Comentarios por Motivo</h4>
        {orden.motivos.map((motivo, index) => (
          <div key={index} className="comentario-item">
            <label>{motivo.tipo}:</label>
            <input
              type="text"
              value={nuevosComentarios[index] || ""}
              onChange={(e) => handleComentarioChange(index, e.target.value)}
            />
          </div>
        ))}

        <div className="botones-modal">
          <button onClick={handleGuardar} className="boton-guardar">Guardar</button>
          <button onClick={onClose} className="boton-cancelar">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default EditarOrdenModal;

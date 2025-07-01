import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Motivos.css';
import axios from '../api'; 

const Motivos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ordenSeleccionada = location.state?.ordenSeleccionada;

  const [observaciones, setObservaciones] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [motivos, setMotivos] = useState([]);
  const [cargando, setCargando] = useState(true);


  useEffect(() => {
    const fetchMotivos = async () => {
      try {
        const res = await axios.get('/api/motivos');
        const motivosDesdeApi = res.data.map((m) => ({
          tipo: m.tipo,
          seleccionado: false,
          comentario: "",
        }));
        setMotivos(motivosDesdeApi);
      } catch (error) {
        console.error("Error al obtener motivos:", error);
        alert("Error al cargar motivos.");
      } finally {
        setCargando(false);
      }
    };

    fetchMotivos();
  }, []);

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

  const confirmarMotivos = async () => {
    const motivosSeleccionados = motivos.filter(m => m.seleccionado);
    const motivosValidos = motivosSeleccionados.filter(m => m.comentario.trim() !== "");

    if (motivosValidos.length === 0) {
      alert("Debes ingresar al menos un motivo con comentario.");
      return;
    }

    const hayMotivoIncompleto = motivosSeleccionados.some(m => m.comentario.trim() === "");
    if (hayMotivoIncompleto) {
      alert("Todos los motivos seleccionados deben tener un comentario.");
      return;
    }

    if (!observaciones.trim()) {
      alert("Debes ingresar una observación.");
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
        estado: "Fuera de Servicio",
      },
      observaciones,
      motivos: motivosValidos,
      fecha: fechaActual,
      hora: horaActual,
    };

    try {
      await axios.post('/api/ordenes', ordenConfirmada); // ✅ POST al backend
      setMostrarModal(true); // Mostrar modal de éxito
    } catch (error) {
      console.error("Error al enviar la orden:", error);
      alert("Error al confirmar la orden.");
    }
  };

  const cancelar = () => navigate('/');

  const cerrarModalYRedirigir = () => {
    setMostrarModal(false);
    navigate('/ordenes');
  };

  if (!ordenSeleccionada) return <p>Error: No hay orden seleccionada.</p>;
  if (cargando) return <p>Cargando motivos...</p>;

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

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button onClick={cancelar} className="boton-cancelar">Cancelar</button>
        <button onClick={confirmarMotivos} className="boton-confirmar">Confirmar</button>
      </div>

      {/* ✅ MODAL de éxito */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <h3>✔ Notificación enviada</h3>
            <p>La orden ha sido confirmada y se notificó por correo.</p>
            <button onClick={cerrarModalYRedirigir}>Aceptar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Motivos;

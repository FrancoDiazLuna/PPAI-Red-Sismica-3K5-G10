using System;
using System.Collections.Generic;
using System.Linq;
using PPAI_Red_Sismica_3K5_G10.Entidades;
using PPAI_Red_Sismica_3K5_G10.LogicaNegocio.RepositoriosSimulados;

namespace PPAI_Red_Sismica_3K5_G10.LogicaNegocio
{
    public class GestorCerrarOrden
    {
        private Usuario riLogueado;
        private OrdenDeInspeccion ordenDeInspeccionEstRealizada;
        private string observacionCierre;
        private string motivo;
        private string comentario;
        private DateTime fechaHoraActual;
        private Estado estadoCerrada;
        private Estado estadoFueraDeServicio;
        private MotivoTipo tipoMotivo;
        private string identificadorMonitor;
        private List<EstacionSismologica> estaciones;
        private List<string> mailRespReparacion;

        public GestorCerrarOrden()
        {
            estaciones = new List<EstacionSismologica>();
            mailRespReparacion = new List<string>();
        }

        public void tomarOrdenDeInspeccion(OrdenDeInspeccion orden)
        {
            ordenDeInspeccionEstRealizada = orden;
            fechaHoraActual = DateTime.Now;
            buscarInfoDeOrden();
            buscarInfoES();
        }

        public Usuario buscarEmpleado()
        {
            // Reccorremos la lista de usuarios y buscar el empleado logueado
            // riLogueado = repositorioUsuarios.FirstOrDefault(u => u.getEmpleado().getNombre() == "NombreEmpleadoLogueado");
            return riLogueado;
        }

        public void buscarOrdenesDeTrabajoEnEstadoRealizadas()
        {
            // Consultamos la fuente de datos para obtener las órdenes en estado "Realizada"
            // Por ejemplo:
            // var ordenes = repositorioOrdenes.Where(o => o.esRealizada()).ToList();
        }

        public void buscarInfoDeOrden()
        {
            if (ordenDeInspeccionEstRealizada != null)
            {
                // Accedemos a los datos de la orden seleccionada
                var nroOrden = ordenDeInspeccionEstRealizada.getNroOrden();
                var fechaCierre = ordenDeInspeccionEstRealizada.getFechaHoraCierre();
                // esto creo que lo tendriamos que retornar
            }
        }

        public void buscarInfoES()
        {
            if (ordenDeInspeccionEstRealizada != null)
            {
                // Accede a la estación sismológica asociada a la orden
                var estacion = ordenDeInspeccionEstRealizada.getEstacionSismologica();
                if (estacion != null && !estaciones.Contains(estacion))
                    estaciones.Add(estacion);
            }
        }

        public void ordenarFechaFinalizacion()
        {
            // A la lista de estaciones, podemos ordenarlas por fecha de finalización de sus órdenes
            // Este método puede ser implementado si es necesario para la lógica de negocio
        }

        public void tomarOrdenDeInspeccion(string ordenSeleccionada)
        {
            // Buscamos la orden por su número o identificador
            // ordenDeInspeccionEstRealizada = repositorioOrdenes.FirstOrDefault(o => o.getNroOrden() == ordenSeleccionada);
        }

        public void tomarObservacionCierreOrdenDeInspeccion(string observacionIngresada)
        {
            observacionCierre = observacionIngresada;
            if (ordenDeInspeccionEstRealizada != null)
                ordenDeInspeccionEstRealizada.setObservacionCierre(observacionCierre);    
        }

        public void buscarMotivo(List<MotivoTipo> motivosDisponibles, string motivoSeleccionado)
        {
            tipoMotivo = motivosDisponibles.FirstOrDefault(m => m.getDescripcion() == motivoSeleccionado);
            motivo = motivoSeleccionado;
        }

        public void habilitarActualizacionSismografoDeES()
        {
            // Actualizamos el estado de los sismógrafos de la estación a "Fuera de Servicio"
            foreach (var estacion in estaciones)
            {
                foreach (var sismografo in estacion.getSismografos())
                {
                    sismografo.setEstadoActual(estadoFueraDeServicio);
                    // Lógica para registrar el motivo y la fecha en el sismógrafo si corresponde
                }
            }
        }

        public void tomarSelecMotivo(string motivoSeleccionado)
        {
            motivo = motivoSeleccionado;
            // En la lista de motivos, buscamos el objeto MotivoTipo correspondiente
            // tipoMotivo = repositorioMotivos.FirstOrDefault(m => m.getDescripcion() == motivoSeleccionado);
        }

        public void solicitarComentario()
        {
            // Aquí podriamos mostrar un mensaje en la UI solicitando el comentario
        }

        public void tomarComentario(string comentarioIngresado)
        {
            comentario = comentarioIngresado;
        }

        public void tomarConfirmacionOrdenDeInspeccion()
        {
            if (ordenDeInspeccionEstRealizada != null)
            {
                ordenDeInspeccionEstRealizada.setEstado(estadoCerrada);
                ordenDeInspeccionEstRealizada.setFechaHoraCierre(fechaHoraActual);
                ordenDeInspeccionEstRealizada.cerrarOrdenDeInspeccion(fechaHoraActual);
            }
        }

        public void validarObservacionDeCierre()
        {
            // Valida que la observación de cierre no esté vacía
            if (string.IsNullOrWhiteSpace(observacionCierre))
                throw new Exception("La observación de cierre es obligatoria.");
        }

        public void buscarEstadoFueraDeServicio(List<Estado> estados)
        {
            // Buscamos el estado "Fuera de Servicio" en la lista de estados
            estadoFueraDeServicio = estados.FirstOrDefault(e => e.esFueraDeServicio());
        }

        public void getFechaHoraActual()
        {
            fechaHoraActual = DateTime.Now;
        }

        public void validarMotivoDeCierre()
        {
            // Valida que el motivo de cierre esté seleccionado
            if (string.IsNullOrWhiteSpace(motivo))
                throw new Exception("Debe seleccionar un motivo de cierre.");
        }

        public void obtenerMailsRespReparacion()
        {
            mailRespReparacion.Clear();
            foreach (var estacion in estaciones)
            {
                mailRespReparacion.AddRange(estacion.obtenerMailsResponsablesReparacion());
            }
        }

        public void enviarMailsYSincronizarMonitores()
        {
            foreach (var estacion in estaciones)
            {
                foreach (var sismografo in estacion.getSismografos())
                {
                    var mensaje = sismografo.generarMensajeNotificacionFueraDeServicio();
                    foreach (var mail in mailRespReparacion)
                    {
                        // Aquí tenemos que implementar el envío real de mails
                        // EmailService.Enviar(mail, "Notificación de Sismógrafo Fuera de Servicio", mensaje);
                        // o usar las interfaces que agreguemos para enviar mails
                    }
                    // Publicar en monitores (simulado)
                    publicarEnMonitores(mensaje);
                }
            }
        }

        public void publicarEnMonitores(string mensaje)
        {
            // Lógica para publicar información relevante en los monitores del sistema
            // Por ejemplo: MonitorCCRS.Publicar(mensaje);
        }

        public void finCU()
        {
            // Lógica para finalizar el caso de uso, limpiar variables, etc.
            ordenDeInspeccionEstRealizada = null;
            observacionCierre = null;
            motivo = null;
            comentario = null;
            fechaHoraActual = default(DateTime);
            estadoCerrada = null;
            estadoFueraDeServicio = null;
            tipoMotivo = null;
            identificadorMonitor = null;
            estaciones.Clear();
            mailRespReparacion.Clear();
        }

        public List<object> buscarOrdenesCompletamenteRealizadasPorEmpleado(Usuario usuario)
        {
            var empleado = usuario.getEmpleado();
            var todasLasOrdenes = RepositorioOrdenesDeInspeccion.GetOrdenes();
            var ordenesDelEmpleado = todasLasOrdenes
                .Where(o => o.getEmpleado() == empleado && o.esCompletamenteRealizada())
                .OrderBy(o => o.getFechaHoraFinalizacion())
                .ToList();

            // Devuelve los datos requeridos para mostrar
            var resultado = new List<object>();
            foreach (var orden in ordenesDelEmpleado)
            {
                var estacion = orden.getEstacionSismologica();
                var sismografos = estacion != null ? estacion.getSismografos() : new List<Sismografo>();
                resultado.Add(new
                {
                    NumeroOrden = orden.getNroOrden(),
                    FechaFinalizacion = orden.getFechaHoraFinalizacion(),
                    Estacion = estacion?.getNombre(),
                    Sismografos = sismografos.Select(s => s.getIdentificadorSismografo()).ToList()
                });
            }
            return resultado;
        }

        public List<MotivoTipo> buscarMotivosFueraDeServicio()
        {
            // Simula la obtención de motivos desde el repositorio
            return RepositorioMotivosTipo.GetMotivos();
        }

        public void asociarMotivosASismografo(Sismografo sismografo, List<(MotivoTipo motivo, string comentario)> motivosSeleccionados)
        {
            foreach (var item in motivosSeleccionados)
            {
                sismografo.agregarMotivoFueraDeServicio(item.motivo, item.comentario);
            }
        }

        public bool solicitarConfirmacionCierre()
        {
            // Validar que haya una orden seleccionada y que tenga observación de cierre
            if (ordenDeInspeccionEstRealizada == null)
                throw new InvalidOperationException("No hay una orden seleccionada.");

            if (!ordenDeInspeccionEstRealizada.tieneObservacionCierre())
                throw new InvalidOperationException("Debe ingresar una observación de cierre.");

            // Agregar más validaciones si es necesario

            // Si todo está correcto, retorna true para que la UI solicite confirmación al usuario
            return true;
        }

        public void validarCierreOrdenYSismografo()
        {
            // Validar observación de cierre
            if (ordenDeInspeccionEstRealizada == null || !ordenDeInspeccionEstRealizada.tieneObservacionCierre())
                throw new InvalidOperationException("Debe ingresar una observación de cierre.");

            // Validar que al menos un sismógrafo tenga motivo de fuera de servicio
            bool algunSismografoConMotivo = false;
            foreach (var estacion in estaciones)
            {
                foreach (var sismografo in estacion.getSismografos())
                {
                    if (sismografo.tieneMotivoFueraDeServicioSeleccionado())
                    {
                        algunSismografoConMotivo = true;
                        break;
                    }
                }
                if (algunSismografoConMotivo)
                    break;
            }
            if (!algunSismografoConMotivo)
                throw new InvalidOperationException("Debe seleccionar al menos un motivo de fuera de servicio para algún sismógrafo.");
        }
    }
}

using System;
using System.Collections.Generic;

namespace PPAI_Red_Sismica_3K5_G10.Entidades
{
    public class Sismografo
    {
        private DateTime fechaAdquisicion;
        private int identificadorSismografo;
        private int nroSerie;
        private Estado estadoActual;
        private List<CambioEstado> cambiosEstado;
        private List<(MotivoTipo motivo, string comentario)> motivosFueraDeServicio = new List<(MotivoTipo, string)>();
        private List<EstacionSismologica> estaciones = new List<EstacionSismologica>();
        private int nroOrden;

        // Constructor
        public Sismografo(DateTime fechaAdquisicion, int identificadorSismografo, int nroSerie, Estado estadoActual)
        {
            this.fechaAdquisicion = fechaAdquisicion;
            this.identificadorSismografo = identificadorSismografo;
            this.nroSerie = nroSerie;
            this.estadoActual = estadoActual;
            cambiosEstado = new List<CambioEstado>();
        }

        // Getters y Setters
        public DateTime getFechaAdquisicion() => fechaAdquisicion;
        public void setFechaAdquisicion(DateTime nuevaFecha) => fechaAdquisicion = nuevaFecha;
        public int getIdentificadorSismografo() => identificadorSismografo;
        public void setIdentificadorSismografo(int nuevoId) => identificadorSismografo = nuevoId;
        public int getNroSerie() => nroSerie;
        public void setNroSerie(int nuevoNro) => nroSerie = nuevoNro;
        public Estado getEstadoActual() => estadoActual;
        public void setEstadoActual(Estado nuevoEstado) => estadoActual = nuevoEstado;
        public List<CambioEstado> getCambiosEstado() => cambiosEstado;
        public void setCambiosEstado(List<CambioEstado> nuevosCambios) => cambiosEstado = nuevosCambios;
        public List<(MotivoTipo motivo, string comentario)> getMotivosFueraDeServicio() => motivosFueraDeServicio;
        public void setMotivosFueraDeServicio(List<(MotivoTipo motivo, string comentario)> nuevosMotivos) => motivosFueraDeServicio = nuevosMotivos;


        // Métodos
        public void crearCambioEstado(CambioEstado cambio)
        {
            // Lógica para crear un cambio de estado
        }

        public void agregarMotivoFueraDeServicio(MotivoTipo motivo, string comentario)
        {
            motivosFueraDeServicio.Add((motivo, comentario));
        }

        public bool tieneMotivoFueraDeServicioSeleccionado()
        {
            return motivosFueraDeServicio != null && motivosFueraDeServicio.Count > 0;
        }

        public void ponerFueraDeServicio(
            Estado estadoFueraDeServicio,
            List<(MotivoTipo motivo, string comentario)> motivos,
            DateTime fechaHora,
            Empleado responsable)
        {
            setEstadoActual(estadoFueraDeServicio);
            setMotivosFueraDeServicio(motivos);

            // Registrar el cambio de estado en la lista de cambios de estado
            var cambio = new CambioEstado(fechaHora, estadoFueraDeServicio, responsable);
            crearCambioEstado(cambio);
        }

        public void actualizarSismografosFueraDeServicio(
            Estado estadoFueraDeServicio,
            Dictionary<Sismografo, List<(MotivoTipo motivo, string comentario)>> motivosPorSismografo,
            DateTime fechaHora,
            Empleado responsable)
        {
            foreach (var estacion in estaciones)
            {
                foreach (var sismografo in estacion.getSismografos())
                {
                    if (motivosPorSismografo.ContainsKey(sismografo))
                    {
                        var motivos = motivosPorSismografo[sismografo];
                        sismografo.ponerFueraDeServicio(estadoFueraDeServicio, motivos, fechaHora, responsable);
                    }
                }
            }
        }

        public string generarMensajeNotificacionFueraDeServicio()
        {
            var estado = getEstadoActual();
            var motivos = getMotivosFueraDeServicio();
            var mensaje = $"Sismógrafo: {getIdentificadorSismografo()}\n" +
                          $"Estado: {estado.getNombreEstado()}\n" +
                          $"Fecha y hora: {DateTime.Now}\n" +
                          $"Motivos:\n";
            foreach (var item in motivos)
            {
                mensaje += $"- {item.motivo.getDescripcion()}: {item.comentario}\n";
            }
            return mensaje;
        }
    }
}

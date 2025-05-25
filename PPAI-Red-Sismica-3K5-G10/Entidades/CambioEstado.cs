using System;

namespace PPAI_Red_Sismica_3K5_G10.Entidades
{
    public class CambioEstado
    {
        private DateTime fechaHoraInicio;
        private DateTime? fechaHoraFin;
        private Estado estado;
        private Empleado responsableCambioEstado;

        // Constructor
        public CambioEstado(DateTime fechaHoraInicio, Estado estado)
        {
            this.fechaHoraInicio = fechaHoraInicio;
            this.estado = estado;
            this.fechaHoraFin = null;
        }

        public CambioEstado(DateTime fechaHoraInicio, Estado estado, Empleado responsableCambioEstado)
        {
            this.fechaHoraInicio = fechaHoraInicio;
            this.estado = estado;
            this.responsableCambioEstado = responsableCambioEstado;
        }

        // Getters y Setters
        public DateTime getFechaHoraInicio() => fechaHoraInicio;
        public void setFechaHoraInicio(DateTime fechaHoraInicio) => this.fechaHoraInicio = fechaHoraInicio;
        public DateTime? getFechaHoraFin() => fechaHoraFin;
        public void setFechaHoraFin(DateTime fechaHora) => this.fechaHoraFin = fechaHora;
        public Estado getEstado() => estado;
        public void setEstado(Estado estado) => this.estado = estado;

        // Métodos
        public bool esEstadoActual()
        {
            return fechaHoraFin != null;
        }
    }
}

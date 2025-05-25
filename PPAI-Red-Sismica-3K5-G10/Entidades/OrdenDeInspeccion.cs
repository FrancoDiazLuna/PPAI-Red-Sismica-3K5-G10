using System;
using System.Collections.Generic;

namespace PPAI_Red_Sismica_3K5_G10.Entidades
{
    public class OrdenDeInspeccion
    {
        private DateTime? fechaHoraCierre { get; set; }
        private DateTime? fechaHoraFinalizacion { get; set; }
        private DateTime? fechaHoraInicio { get; set; }
        private string nroOrden { get; set; }
        private string observacionCierre { get; set; }
        private Empleado empleado { get; set; }
        private List<TareaAsignada> tareasAsignadas { get; set; }
        private Estado estado { get; set; }
        private EstacionSismologica estacionSismologica { get; set; }

        public OrdenDeInspeccion()
        {
            tareasAsignadas = new List<TareaAsignada>();
        }

        public DateTime? getFechaHoraCierre() => fechaHoraCierre;
        public string getNroOrden() => nroOrden;
        public void setEstado(Estado nuevoEstado) => estado = nuevoEstado;
        public void setFecha() { }
        public void setFechaHoraCierre(DateTime fechaHora) => fechaHoraCierre = fechaHora;
        public bool esRealizada() => fechaHoraInicio.HasValue;
        public void buscarInoDeOrden() { }
        public void esDeObservacionDeCierre() { }
        public void cerrarOrdenDeInspeccion(DateTime fechaHora) => fechaHoraCierre = fechaHora;
        public void setFechaYHoraDeCierre(DateTime fechaHora) => fechaHoraCierre = fechaHora;
    }
}

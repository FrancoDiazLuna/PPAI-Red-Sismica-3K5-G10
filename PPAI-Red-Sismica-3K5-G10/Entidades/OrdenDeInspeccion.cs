using System;
using System.Collections.Generic;

namespace PPAI_Red_Sismica_3K5_G10.Entidades
{
    public class OrdenDeInspeccion
    {
        private DateTime? fechaHoraCierre;
        private DateTime? fechaHoraFinalizacion;
        private DateTime? fechaHoraInicio;
        private string nroOrden;
        private string observacionCierre;
        private Empleado empleado;
        private List<TareaAsignada> tareasAsignadas;
        private Estado estado;
        private EstacionSismologica estacionSismologica;
        private OrdenDeInspeccion ordenDeInspeccionEstRealizada;
        private DateTime fechaHoraActua;

        // Constructor
        public OrdenDeInspeccion(string nroOrden, DateTime? fechaHoraInicio, Empleado empleado, EstacionSismologica estacionSismologica)
        {
            this.nroOrden = nroOrden;
            this.fechaHoraInicio = fechaHoraInicio;
            this.empleado = empleado;
            this.estacionSismologica = estacionSismologica;
            tareasAsignadas = new List<TareaAsignada>();
            estado = new Estado("Orden de Inspeccion", "Pendiente");
        }

        // Getters y Setters
        public DateTime? getFechaHoraCierre() => fechaHoraCierre;
        public void setFechaHoraCierre(DateTime fechaHora) => fechaHoraCierre = fechaHora;
        public DateTime? getFechaHoraFinalizacion() => fechaHoraFinalizacion;
        public void setFechaHoraFinalizacion(DateTime fechaHora) => fechaHoraFinalizacion = fechaHora;
        public DateTime? getFechaHoraInicio() => fechaHoraInicio;
        public void setFechaHoraInicio(DateTime fechaHora) => fechaHoraInicio = fechaHora;
        public string getNroOrden() => nroOrden;
        public void setNroOrden(string nroOrden) => this.nroOrden = nroOrden;
        public string getObservacionCierre() => observacionCierre;
        public void setObservacionCierre(string observacionCierre) => this.observacionCierre = observacionCierre;
        public Empleado getEmpleado() => empleado;
        public void setEmpleado(Empleado empleado) => this.empleado = empleado;
        public List<TareaAsignada> getTareasAsignadas() => tareasAsignadas;
        public void setTareasAsignadas(List<TareaAsignada> tareasAsignadas) => this.tareasAsignadas = tareasAsignadas;
        public Estado getEstado() => estado;
        public void setEstado(Estado nuevoEstado) => estado = nuevoEstado;
        public EstacionSismologica getEstacionSismologica() => estacionSismologica;
        public void setEstacionSismologica(EstacionSismologica estacionSismologica) => this.estacionSismologica = estacionSismologica;

        // Métodos
        public void setFecha()
        {
            fechaHoraFinalizacion = DateTime.Now;
        }

        public bool esRealizada()
        {
            return estado != null && estado.getNombreEstado() == "Realizada";
        }

        public bool esCompletamenteRealizada()
        {
            // Una orden está completamente realizada si todas las tareas tienen resultado registrado
            if (tareasAsignadas == null || tareasAsignadas.Count == 0)
                return false;
            foreach (var tarea in tareasAsignadas)
            {
                if (!tarea.tieneResultado())
                    return false;
            }
            return true;
        }

        public void buscarInoDeOrden()
        {
            // Retornar información relevante de la orden
        }

        public void esDeObservacionDeCierre()
        {
            // Retorna true si la orden requiere observación de cierre
            // Por ejemplo:
            // return !string.IsNullOrEmpty(observacionCierre);
        }

        public void cerrarOrdenDeInspeccion(DateTime fechaHora)
        {
            setFechaHoraCierre(fechaHora);
            setEstado(new Estado("Orden de Inspeccion", "Cerrada"));
        }

        public void cerrarOrdenDeInspeccion(DateTime fechaHora, Estado estadoCerrada)
        {
            setFechaHoraCierre(fechaHora);
            setEstado(estadoCerrada);
        }

        public void setFechaYHoraDeCierre(DateTime fechaHora)
        {
            fechaHoraCierre = fechaHora;
        }

        public bool tieneObservacionCierre()
        {
            return !string.IsNullOrWhiteSpace(observacionCierre);
        }

        public void cerrarOrden()
        {
            if (ordenDeInspeccionEstRealizada == null)
                throw new InvalidOperationException("No hay una orden seleccionada.");

            DateTime fechaHoraActual = DateTime.Now;

            // Si tenemos un objeto Estado para "Cerrada" obtenido de un repositorio, habria usarlo, por ej:
            // ordenDeInspeccionEstRealizada.cerrarOrdenDeInspeccion(fechaHoraActual, estadoCerrada);

            // Si no, usamos el método actual:
            ordenDeInspeccionEstRealizada.cerrarOrdenDeInspeccion(fechaHoraActual);
        }
    }
}

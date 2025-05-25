using System;
using System.Collections.Generic;
using PPAI_Red_Sismica_3K5_G10.Entidades;

namespace PPAI_Red_Sismica_3K5_G10.LogicaNegocio
{
    public class GestorCerrarOrden
    {
        private Empleado riLogueado;
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

        public void tomarOrdenDeInspeccion(OrdenDeInspeccion orden)
        {
            ordenDeInspeccionEstRealizada = orden;
            fechaHoraActual = DateTime.Now;
        }

        public Empleado buscarEmpleado()
        {
            // Lógica para buscar el empleado logueado
            return riLogueado;
        }

        public void buscarOrdenes()
        {
        }

        public void tomarMotivoFueraDeServicio(string motivoSeleccionado)
        {
            motivo = motivoSeleccionado;
        }

        public void tomarComentario(string comentarioIngresado)
        {
            comentario = comentarioIngresado;
        }

        public void tomarConfirmacionCerrarOrdenDeInspeccion()
        {
            if (ordenDeInspeccionEstRealizada != null)
            {
                ordenDeInspeccionEstRealizada.cerrarOrdenDeInspeccion(DateTime.Now);
                // Lógica adicional para notificar, actualizar estados, etc.
            }
        }

        public void iniciarMail()
        {
            // Lógica para iniciar el envío de mail
        }

        public void tomarMail()
        {
            // Lógica para tomar el mail de reparación
        }

    }
}

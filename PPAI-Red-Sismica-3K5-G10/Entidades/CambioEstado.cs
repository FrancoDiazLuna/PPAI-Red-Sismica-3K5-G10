using System;

namespace PPAI_Red_Sismica_3K5_G10.Entidades
{
    public class CambioEstado
    {
        private DateTime fechaHoraInicio { get; set; }
        private DateTime fechaHoraFin { get; set; }
        private Estado estado { get; set; }

        public void setFechaHoraFin(DateTime fechaHora)
        {
            fechaHoraFin = fechaHora;
        }

        public bool esEstadoActual()
        {
            return fechaHoraFin == default(DateTime);
        }
    }
}

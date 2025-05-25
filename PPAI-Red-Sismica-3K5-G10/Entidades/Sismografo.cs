using System;
using System.Collections.Generic;

namespace PPAI_Red_Sismica_3K5_G10.Entidades
{
    public class Sismografo
    {
        private DateTime fechaAdquisicion { get; set; }
        private int identificadorSismografo { get; set; }
        private int nroSerie { get; set; }
        private Estado estadoActual { get; set; }
        private List<CambioEstado> cambiosEstado { get; set; }

        public Sismografo()
        {
            cambiosEstado = new List<CambioEstado>();
        }

        public int getIdentificadorSismografo() => identificadorSismografo;
        public void setEstadoActual(Estado nuevoEstado)
        {
            //estadoActual = nuevoEstado;
            //CambioEstado cambio = new CambioEstado
            //{
            //    fechaHoraInicio = DateTime.Now,
            //    estado = nuevoEstado
            //};
            //crearCambioEstado(cambio);
        }

        public void crearCambioEstado(CambioEstado cambio)
        {
            cambiosEstado.Add(cambio);
        }
    }
}

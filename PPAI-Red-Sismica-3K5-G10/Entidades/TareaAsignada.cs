using System;

namespace PPAI_Red_Sismica_3K5_G10.Entidades
{
    public class TareaAsignada
    {
        private string comentario;
        private DateTime? fechaHoraRealizacion;

        // Constructor
        public TareaAsignada(string comentario, DateTime? fechaHoraRealizacion = null)
        {
            this.comentario = comentario;
            this.fechaHoraRealizacion = fechaHoraRealizacion;
        }

        // Getters y Setters
        public string getComentario() => comentario;
        public void setComentario(string nuevoComentario) => comentario = nuevoComentario;
        public DateTime? getFechaHoraRealizacion() => fechaHoraRealizacion;
        public void setFechaHoraRealizacion(DateTime? nuevaFechaHora) => fechaHoraRealizacion = nuevaFechaHora;


        // Métodos
        public string mostrarDatostarea() =>
            $"Comentario: {comentario}, Fecha y hora de realización: {fechaHoraRealizacion?.ToString("g") ?? "No realizada"}";
        public void setFechaHora() { }
        public void setResultados() { }
        public bool tieneRegistroRI() => false; // implementar lógica para verificar si tiene registro RI

        public bool tieneResultado()
        {
            // Considera que hay resultado si la fecha de realización no es nula
            return fechaHoraRealizacion.HasValue;
        }
    }
}

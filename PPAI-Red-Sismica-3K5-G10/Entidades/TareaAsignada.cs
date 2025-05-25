using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPAI_Red_Sismica_3K5_G10.Entidades
{
    public class TareaAsignada
    {
        private string comentario { get; set; }
        private DateTime? fechaHoraRealizacion { get; set; }

        public string mostrarDatostarea() =>
            $"Comentario: {comentario}, Fecha y hora de realización: {fechaHoraRealizacion?.ToString("g") ?? "No realizada"}";
        public void setFechaHora() { }
        public void setResultados() { }
        public bool tieneRegistroRI() => fechaHoraRealizacion != null;
        public string getComentario() => comentario;
    }
}

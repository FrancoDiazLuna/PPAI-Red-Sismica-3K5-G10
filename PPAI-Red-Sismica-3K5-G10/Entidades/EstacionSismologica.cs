using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Threading.Tasks;

namespace PPAI_Red_Sismica_3K5_G10.Entidades
{
    public class EstacionSismologica
    {
        private string codigoEstacion { get; set; }
        private string documentoCertificacionAdq { get; set; }
        private string fechaSolicitydCertificacion { get; set; }
        private string nombre { get; set; }
        private string latitud { get; set; }
        private string longitud { get; set; }
        private string nroCertificacionAdquisiciion { get; set; }
        private List<Sismografo> sismografos { get; set; }

        public EstacionSismologica()
        {
            sismografos = new List<Sismografo>();
        }

        public string getCodigoEstacion() => codigoEstacion;
        public string getEstaciones() => "estaciones";
        public string getNombre() => nombre;
        public Sismografo getSismografoActual() => sismografos?.FindLast(s => s.esActual());
    }
}

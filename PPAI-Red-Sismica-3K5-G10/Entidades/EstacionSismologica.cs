using System.Collections.Generic;

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

        // Constructor
        public EstacionSismologica(string codigoEstacion, string documentoCertificacionAdq, string fechaSolicitydCertificacion, string nombre, string latitud, string longitud, string nroCertificacionAdquisiciion)
        {
            this.codigoEstacion = codigoEstacion;
            this.documentoCertificacionAdq = documentoCertificacionAdq;
            this.fechaSolicitydCertificacion = fechaSolicitydCertificacion;
            this.nombre = nombre;
            this.latitud = latitud;
            this.longitud = longitud;
            this.nroCertificacionAdquisiciion = nroCertificacionAdquisiciion;
            sismografos = new List<Sismografo>();
        }

        // Getters y Setters
        public string getCodigoEstacion() => codigoEstacion;
        public void setCodigoEstacion(string nuevoCodigo) => codigoEstacion = nuevoCodigo;
        public string getDocumentoCertificacionAdq() => documentoCertificacionAdq;
        public void setDocumentoCertificacionAdq(string nuevoDocumento) => documentoCertificacionAdq = nuevoDocumento;
        public string getFechaSolicitydCertificacion() => fechaSolicitydCertificacion;
        public void setFechaSolicitydCertificacion(string nuevaFecha) => fechaSolicitydCertificacion = nuevaFecha;
        public string getNombre() => nombre;
        public void setNombre(string nuevoNombre) => nombre = nuevoNombre;
        public string getLatitud() => latitud;
        public void setLatitud(string nuevaLatitud) => latitud = nuevaLatitud;
        public string getLongitud() => longitud;
        public void setLongitud(string nuevaLongitud) => longitud = nuevaLongitud;
        public string getNroCertificacionAdquisiciion() => nroCertificacionAdquisiciion;
        public void setNroCertificacionAdquisiciion(string nuevoNro) => nroCertificacionAdquisiciion = nuevoNro;
        public List<Sismografo> getSismografos() => sismografos;
        public void setSismografos(List<Sismografo> nuevosSismografos) => sismografos = nuevosSismografos;

        // Métodos
        public string getEstaciones() => "estaciones";

        public List<string> obtenerMailsResponsablesReparacion()
        {
            var mails = new List<string>();
            foreach (var sismografo in sismografos)
            {
                // Suponiendo que cada sismógrafo tiene un responsable
                // Si tenemos una propiedad responsable, usamos:
                // if (sismografo.getResponsable() != null)
                //     mails.Add(sismografo.getResponsable().getMail());
                // Si no, hay que simularlo o adaptarlo al modelo.
            }
            return mails;
        }
    }
}

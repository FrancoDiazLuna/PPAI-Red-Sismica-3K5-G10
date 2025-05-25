
namespace PPAI_Red_Sismica_3K5_G10.Entidades
{
    public class Rol
    {
        private string descripcionRol;
        private string nombre;

        // Constructor
        public Rol(string descripcionRol, string nombre)
        {
            this.descripcionRol = descripcionRol;
            this.nombre = nombre;
        }

        // Getters y Setters
        public string getDescripcionRol() => descripcionRol;
        public void setDescripcionRol(string nuevaDescripcion) => descripcionRol = nuevaDescripcion;
        public string getNombreRol() => nombre;
        public void setNombreRol(string nuevoNombre) => nombre = nuevoNombre;

        // Métodos
        public bool esReparacion() => nombre == "Responsable de Reparación";
    }
}

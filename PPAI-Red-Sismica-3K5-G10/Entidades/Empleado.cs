
namespace PPAI_Red_Sismica_3K5_G10.Entidades
{
    public class Empleado
    {
        private string apellido;
        private string mail;
        private string nombre;
        private string telefono;

        // Constructor
        public Empleado(string apellido, string mail, string nombre, string telefono)
        {
            this.apellido = apellido;
            this.mail = mail;
            this.nombre = nombre;
            this.telefono = telefono;
        }

        // Getters y Setters
        public string getApellido() => apellido;
        public void setApellido(string nuevoApellido) => apellido = nuevoApellido;
        public string getNombre() => nombre;
        public void setNombre(string nuevoNombre) => nombre = nuevoNombre;
        public string getMail() => mail;
        public void setMail(string nuevoMail) => mail = nuevoMail;
        public string getTelefono() => telefono;
        public void setTelefono(string nuevoTelefono) => telefono = nuevoTelefono;

        // Métodos
        public bool esResponsableDeReparacion()
        {
            return true;
        }
    }
}

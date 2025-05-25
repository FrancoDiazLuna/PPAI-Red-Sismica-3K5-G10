
namespace PPAI_Red_Sismica_3K5_G10.Entidades
{
    public class Usuario
    {
        public string contraseña;
        public string nombreUsuario;
        public Empleado empleado;

        // Constructor
        public Usuario(string contraseña, string nombreUsuario, Empleado empleado)
        {
            this.contraseña = contraseña;
            this.nombreUsuario = nombreUsuario;
            this.empleado = empleado;
        }

        // Getters y Setters
        // public string getContraseña() => contraseña; // Se eliminó el getter de contraseña por razones de seguridad
        public void setContraseña(string nuevaContraseña) => contraseña = nuevaContraseña;
        public string getNombreUsuario() => nombreUsuario;
        public void setNombreUsuario(string nuevoNombreUsuario) => nombreUsuario = nuevoNombreUsuario;
        public Empleado getEmpleado() => empleado;
        public void setEmpleado(Empleado nuevoEmpleado) => empleado = nuevoEmpleado;

        // Métodos
        public void getRILogueado() { }
        public bool esDeEmpleado() {
            // Logica para determinar si la orden de trabajo es de un empleado
            // Por ejemplo, podrías verificar si el empleado tiene un rol específico
            // o si está asociado a una estación sismológica.
            return empleado != null && empleado.esResponsableDeReparacion();
        }
    }
}

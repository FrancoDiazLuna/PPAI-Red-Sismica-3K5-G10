using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPAI_Red_Sismica_3K5_G10.Entidades
{
    public class Usuario
    {
        public string contraseña { get; set; }
        public string nombreUsuario { get; set; }
        public Empleado empleado { get; set; }


        public void getRILogueado() { }
        public bool esDeEmpleado() => empleado != null;
    }
}

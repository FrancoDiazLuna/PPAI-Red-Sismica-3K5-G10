using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPAI_Red_Sismica_3K5_G10.Entidades
{
    public class Empleado
    {
        private string apellido { get; set; }
        private string mail { get; set; }
        private string nombre { get; set; }
        private string telefono { get; set; }

        public bool esResponsableDeReparacion()
        {
            return true;
        }

        public string obtenerMail()
        {
            return mail;
        }

        public string getApellido()
        {
            return apellido;
        }
    }
}

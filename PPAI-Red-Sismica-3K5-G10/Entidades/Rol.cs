using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPAI_Red_Sismica_3K5_G10.Entidades
{
    public class Rol
    {
        private string descripcionRol { get; set; }
        private string nombre { get; set; }

        public string getNombreRol() => nombre;
        public bool esResponsable() => descripcionRol == "Responsable de Reparación";
    }
}

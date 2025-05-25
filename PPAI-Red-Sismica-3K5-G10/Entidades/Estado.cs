using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPAI_Red_Sismica_3K5_G10.Entidades
{
    public class Estado
    {
        private string ambito { get; set; }
        private string nombreEstado { get; set; }

        public bool esAmbitoSismografo() => ambito == "Sismografo";
        public bool esFueraDeServicio() => nombreEstado == "Fuera de Servicio";
    }
}

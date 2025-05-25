using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPAI_Red_Sismica_3K5_G10.Entidades
{
    public class MotivoFueraDeServicio
    {
        private string comentario { get; set; }
        private MotivoTipo motivoTipo { get; set; }

        public string getMotivo() => motivoTipo?.getDescripcion();
    }
}

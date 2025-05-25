using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPAI_Red_Sismica_3K5_G10.Entidades
{
    public class ApreciacionTipo
    {
        private string color { get; set; }
        private string leyenda { get; set; }

        public string getLeyenda() => leyenda;
        public string getColor() => color;
    }
}

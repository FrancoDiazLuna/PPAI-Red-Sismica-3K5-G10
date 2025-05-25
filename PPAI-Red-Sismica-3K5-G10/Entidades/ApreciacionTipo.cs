
namespace PPAI_Red_Sismica_3K5_G10.Entidades
{
    public class ApreciacionTipo
    {
        private string color;
        private string leyenda;

        // Constructor
        public ApreciacionTipo(string color, string leyenda)
        {
            this.color = color;
            this.leyenda = leyenda;
        }

        // Getters y Setters
        public string getColor() => color;
        public void setColor(string nuevoColor) => color = nuevoColor;
        public string getLeyenda() => leyenda;
        public void setLeyenda(string nuevaLeyenda) => leyenda = nuevaLeyenda;
    }
}

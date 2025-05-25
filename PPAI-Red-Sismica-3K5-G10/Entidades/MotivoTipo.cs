
namespace PPAI_Red_Sismica_3K5_G10.Entidades
{
    public class MotivoTipo
    {
        private string descripcion;

        // Constructor
        public MotivoTipo(string descripcion)
        {
            this.descripcion = descripcion;
        }

        // Getters y Setters
        public string getDescripcion() => descripcion;
        public void setDescripcion(string nuevaDescripcion) => descripcion = nuevaDescripcion;
    }
}

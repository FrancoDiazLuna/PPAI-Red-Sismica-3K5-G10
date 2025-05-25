
namespace PPAI_Red_Sismica_3K5_G10.Entidades
{
    public class Estado
    {
        private string ambito;
        private string nombreEstado;

        // Constructor
        public Estado(string ambito, string nombreEstado)
        {
            this.ambito = ambito;
            this.nombreEstado = nombreEstado;
        }

        // Getters y Setters
        public string getAmbito() => ambito;
        public void setAmbito(string nuevoAmbito) => ambito = nuevoAmbito;
        public string getNombreEstado() => nombreEstado;
        public void setNombreEstado(string nuevoNombreEstado) => nombreEstado = nuevoNombreEstado;

        // Métodos
        public bool esAmbitoSismografo() => ambito == "Sismografo";
        public bool esFueraDeServicio() => nombreEstado == "Fuera de Servicio";
    }
}

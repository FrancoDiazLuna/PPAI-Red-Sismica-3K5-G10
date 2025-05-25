using System.Collections.Generic;
using PPAI_Red_Sismica_3K5_G10.Entidades;

namespace PPAI_Red_Sismica_3K5_G10.LogicaNegocio.RepositoriosSimulados
{
    public static class RepositorioEstados
    {
        private static List<Estado> estados = new List<Estado>
        {
            new Estado("Orden", "Realizada"),
            new Estado("Orden", "Cerrada"),
            new Estado("Sismografo", "Fuera de Servicio"),
            new Estado("Sismografo", "Operativo")
        };

        public static List<Estado> GetEstados() => estados;

        public static Estado GetEstadoPorNombre(string nombre)
        {
            return estados.Find(e => e.getNombreEstado() == nombre);
        }
    }
}
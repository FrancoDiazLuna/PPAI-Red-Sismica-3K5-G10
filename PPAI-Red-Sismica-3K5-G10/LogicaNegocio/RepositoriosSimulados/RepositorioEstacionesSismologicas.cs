using System.Collections.Generic;
using PPAI_Red_Sismica_3K5_G10.Entidades;

namespace PPAI_Red_Sismica_3K5_G10.LogicaNegocio.RepositoriosSimulados
{
    public static class RepositorioEstacionesSismologicas
    {
        private static List<EstacionSismologica> estaciones;

        static RepositorioEstacionesSismologicas()
        {
            estaciones = new List<EstacionSismologica>();

            var estacion1 = new EstacionSismologica("ES-001", "DOC-001", "2023-01-01", "Estación Central", "-34.6037", "-58.3816", "CERT-001");
            var estacion2 = new EstacionSismologica("ES-002", "DOC-002", "2023-01-02", "Estación Norte", "-34.7000", "-58.4000", "CERT-002");

            var estadoOperativo = new Estado("Sismografo", "Operativo");

            var sismografo1 = new Sismografo(new System.DateTime(2022, 1, 1), 1, 1001, estadoOperativo);
            var sismografo2 = new Sismografo(new System.DateTime(2022, 2, 1), 2, 1002, estadoOperativo);
            var sismografo3 = new Sismografo(new System.DateTime(2022, 3, 1), 3, 1003, estadoOperativo);

            estacion1.setSismografos(new List<Sismografo> { sismografo1, sismografo2 });
            estacion2.setSismografos(new List<Sismografo> { sismografo3 });

            estaciones.Add(estacion1);
            estaciones.Add(estacion2);
        }

        public static List<EstacionSismologica> GetEstaciones() => estaciones;

        public static EstacionSismologica GetEstacionPorCodigo(string codigo)
        {
            return estaciones.Find(e => e.getCodigoEstacion() == codigo);
        }
    }
}
using System;
using System.Collections.Generic;
using PPAI_Red_Sismica_3K5_G10.Entidades;

namespace PPAI_Red_Sismica_3K5_G10.LogicaNegocio.RepositoriosSimulados
{
    public static class RepositorioOrdenesDeInspeccion
    {
        private static List<OrdenDeInspeccion> ordenes = new List<OrdenDeInspeccion>
        {
            new OrdenDeInspeccion(
                "OI-001",
                DateTime.Now.AddDays(-2),
                RepositorioEmpleados.GetEmpleadoPorNombre("Juan P�rez"),
                RepositorioEstacionesSismologicas.GetEstacionPorCodigo("ES-001")
            ),
            new OrdenDeInspeccion(
                "OI-002",
                DateTime.Now.AddDays(-1),
                RepositorioEmpleados.GetEmpleadoPorNombre("Ana G�mez"),
                RepositorioEstacionesSismologicas.GetEstacionPorCodigo("ES-002")
            )
        };

        public static List<OrdenDeInspeccion> GetOrdenes() => ordenes;

        public static OrdenDeInspeccion GetOrdenPorNumero(string nroOrden)
        {
            return ordenes.Find(o => o.getNroOrden() == nroOrden);
        }
    }
}
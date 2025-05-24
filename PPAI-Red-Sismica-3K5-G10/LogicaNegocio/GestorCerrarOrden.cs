using PPAI_Red_Sismica_3K5_G10.CapaNegocio;
using PPAI_Red_Sismica_3K5_G10.LogicaNegocio.RepositoriosSimulados;
using System;
using System.Collections.Generic;

namespace PPAI_Red_Sismica_3K5_G10.LogicaNegocio
{
    private readonly RepositorioOrdenes repo;

    public GestorCerrarOrden()
    {
        repo = new RepositorioOrdenes();
    }

    public void InicializarSimulacion()
    {
        Empleado emp = new Empleado { Nombre = "Juan", Apellido = "Pérez", EsResponsableDeReparacion = true };

        OrdenDeInspeccion orden = new OrdenDeInspeccion
        {
            EmpleadoAsignado = emp,
            EstadoActual = new Estado { Nombre = "Abierta" },
            FechaCreacion = DateTime.Now
        };

        repo.Agregar(orden);
    }

    public List<OrdenDeInspeccion> ObtenerOrdenes()
    {
        return repo.ObtenerTodas();
    }

    public void CerrarOrden(OrdenDeInspeccion orden)
    {
        orden.EstadoActual = new Estado { Nombre = "Cerrada" };
        orden.FechaCierre = DateTime.Now;
        repo.Actualizar(orden);
    }
}

using PPAI_Red_Sismica_3K5_G10.CapaNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPAI_Red_Sismica_3K5_G10.LogicaNegocio.RepositoriosSimulados
{
    public class RepositorioOrdenes
    {
        private List<OrdenDeInspeccion> ordenes = new List<OrdenDeInspeccion>();

        public void Agregar(OrdenDeInspeccion orden)
        {
            ordenes.Add(orden);
        }

        public List<OrdenDeInspeccion> ObtenerTodas()
        {
            return ordenes;
        }

        public OrdenDeInspeccion ObtenerPorIndice(int index)
        {
            return ordenes.ElementAtOrDefault(index);
        }

        public void Actualizar(OrdenDeInspeccion orden)
        {
            // Nada que hacer, porque es referencia en memoria
        }

        public void Eliminar(OrdenDeInspeccion orden)
        {
            ordenes.Remove(orden);
        }
    }
}

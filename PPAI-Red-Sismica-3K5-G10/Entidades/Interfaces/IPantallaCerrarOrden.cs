using PPAI_Red_Sismica_3K5_G10.CapaNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PPAI_Red_Sismica_3K5_G10.Entidades.Interfaces
{
    public interface IPantallaCerrarOrden
    {
        void MostrarMensaje(string mensaje);
        void MostrarOrdenes(List<OrdenDeInspeccion> ordenes);
        OrdenDeInspeccion ObtenerOrdenSeleccionada();
        DateTime ObtenerFechaCierre();
        Estado ObtenerEstadoSeleccionado();
        string ObtenerObservaciones();
        MotivoFueraDeServicio ObtenerMotivoFueraDeServicio();
    }
}

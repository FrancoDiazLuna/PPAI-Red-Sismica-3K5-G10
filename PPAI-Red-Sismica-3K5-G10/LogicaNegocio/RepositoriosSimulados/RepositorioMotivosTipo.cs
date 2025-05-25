using System.Collections.Generic;
using PPAI_Red_Sismica_3K5_G10.Entidades;

namespace PPAI_Red_Sismica_3K5_G10.LogicaNegocio.RepositoriosSimulados
{
    public static class RepositorioMotivosTipo
    {
        private static List<MotivoTipo> motivos = new List<MotivoTipo>
        {
            new MotivoTipo("Falla eléctrica"),
            new MotivoTipo("Mantenimiento programado"),
            new MotivoTipo("Daño por evento sísmico")
        };

        public static List<MotivoTipo> GetMotivos() => motivos;
    }
}
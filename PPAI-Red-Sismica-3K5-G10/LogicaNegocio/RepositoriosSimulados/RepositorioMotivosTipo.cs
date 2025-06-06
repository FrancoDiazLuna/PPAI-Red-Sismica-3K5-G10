using System.Collections.Generic;
using PPAI_Red_Sismica_3K5_G10.Entidades;

namespace PPAI_Red_Sismica_3K5_G10.LogicaNegocio.RepositoriosSimulados
{
    public static class RepositorioMotivosTipo
    {
        private static List<MotivoTipo> motivos = new List<MotivoTipo>
        {
            new MotivoTipo("Falla el�ctrica"),
            new MotivoTipo("Mantenimiento programado"),
            new MotivoTipo("Da�o por evento s�smico")
        };

        public static List<MotivoTipo> GetMotivos() => motivos;
    }
}
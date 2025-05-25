using System.Collections.Generic;
using PPAI_Red_Sismica_3K5_G10.Entidades;

namespace PPAI_Red_Sismica_3K5_G10.LogicaNegocio.RepositoriosSimulados
{
    public static class RepositorioUsuarios
    {
        private static List<Usuario> usuarios = new List<Usuario>
        {
            new Usuario("1234", "ri1", RepositorioEmpleados.GetEmpleadoPorNombre("Juan Pérez")),
            new Usuario("5678", "ri2", RepositorioEmpleados.GetEmpleadoPorNombre("Ana Gómez"))
        };

        public static List<Usuario> GetUsuarios() => usuarios;

        public static Usuario GetUsuarioPorNombre(string nombreUsuario)
        {
            return usuarios.Find(u => u.nombreUsuario == nombreUsuario);
        }
    }
}
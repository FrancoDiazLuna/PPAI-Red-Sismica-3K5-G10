using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PPAI_Red_Sismica_3K5_G10.Entidades;

namespace PPAI_Red_Sismica_3K5_G10.LogicaNegocio.RepositoriosSimulados
{
    public static class RepositorioEmpleados
    {
        private static List<Empleado> empleados = new List<Empleado>
        {
            new Empleado("Pérez", "juan.perez@mail.com", "Juan Pérez", "123456789"),
            new Empleado("Gómez", "ana.gomez@mail.com", "Ana Gómez", "987654321")
        };

        public static List<Empleado> GetEmpleados() => empleados;

        public static Empleado GetEmpleadoPorNombre(string nombre)
        {
            return empleados.Find(e => e.getNombre() == nombre);
        }
    }
}

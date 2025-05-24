using System;

namespace PPAI_Red_Sismica_3K5_G10.Utilidades
{
    public static class Formateador
    {
        public static string FormatearFecha(DateTime fecha)
        {
            return fecha.ToString("dd/MM/yyyy HH:mm");
        }

        public static string Capitalizar(string texto)
        {
            if (string.IsNullOrEmpty(texto)) return texto;
            return char.ToUpper(texto[0]) + texto.Substring(1).ToLower();
        }

        public static string FormatearOrden(int id, string estado)
        {
            return $"Orden #{id} - Estado: {estado}";
        }
    }
}

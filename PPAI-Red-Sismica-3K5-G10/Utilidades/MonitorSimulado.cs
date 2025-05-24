using System;
using PPAI_Red_Sismica_3K5_G10.Entidades.Interfaces;

namespace PPAI_Red_Sismica_3K5_G10.Utilidades
{
    public class MonitorSimulado : IMonitorCRS
    {
        public string Identificador { get; set; }

        public void Detectar()
        {
            Console.WriteLine($"[MONITOR SIMULADO] Estación {Identificador} está siendo monitoreada.");
        }
    }
}

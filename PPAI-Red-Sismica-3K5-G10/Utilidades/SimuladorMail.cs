using System;
using PPAI_Red_Sismica_3K5_G10.Entidades.Interfaces;

namespace PPAI_Red_Sismica_3K5_G10.Utilidades
{
    public class SimuladorMail : InterfaceMail
    {
        public string Dominio { get; set; }
        public string FormatoNotificacion { get; set; }
        public string Texto { get; set; }

        public void EnviarMail()
        {
            Console.WriteLine($"[SIMULADOR MAIL] Enviando mail a {Dominio} con texto:\n{Texto}");
            // Simulación: también podrías usar MessageBox.Show o loguear
        }
    }
}

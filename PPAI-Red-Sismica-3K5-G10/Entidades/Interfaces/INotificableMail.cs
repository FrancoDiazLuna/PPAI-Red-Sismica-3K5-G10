
namespace PPAI_Red_Sismica_3K5_G10.Entidades.Interfaces
{
    public interface InterfaceMail
    {
        string Dominio { get; set; }
        string FormatoNotificacion { get; set; }
        string Texto { get; set; }

        void EnviarMail();
    }
}

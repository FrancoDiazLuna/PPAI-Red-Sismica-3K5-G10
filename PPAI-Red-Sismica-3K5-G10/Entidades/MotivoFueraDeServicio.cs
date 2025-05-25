
namespace PPAI_Red_Sismica_3K5_G10.Entidades
{
    public class MotivoFueraDeServicio
    {
        private string comentario;
        private MotivoTipo motivoTipo;

        // Constructor
        public MotivoFueraDeServicio(string comentario, MotivoTipo motivoTipo)
        {
            this.comentario = comentario;
            this.motivoTipo = motivoTipo;
        }

        // Getters y Setters
        public string getComentario() => comentario;
        public void setComentario(string nuevoComentario) => comentario = nuevoComentario;
        public string getMotivo() => motivoTipo?.getDescripcion();
        public void setMotivo(MotivoTipo nuevoMotivo) => motivoTipo = nuevoMotivo;
    }
}

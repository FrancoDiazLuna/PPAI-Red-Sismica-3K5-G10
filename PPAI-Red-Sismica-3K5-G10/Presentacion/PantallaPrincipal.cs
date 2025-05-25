using System;
using System.Windows.Forms;

namespace PPAI_Red_Sismica_3K5_G10.Presentacion
{
    public partial class PantallaPrincipal : Form
    {
        public PantallaPrincipal()
        {
            InitializeComponent();
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void btnVer_Click(object sender, EventArgs e)
        {
            PantallaOrdenesFinalizadas pOrdenesFinalizadas = new PantallaOrdenesFinalizadas();
            pOrdenesFinalizadas.ShowDialog();
        }

        private void pictureBox1_Click(object sender, EventArgs e)
        {

        }

        private void btnCerrar_Click(object sender, EventArgs e)
        {
            PantallaOrdenesRealizadas pOrdenesRealizadas = new PantallaOrdenesRealizadas();
            pOrdenesRealizadas.ShowDialog();
        }

        private void PantallaPrincipal_Load(object sender, EventArgs e)
        {

        }
    }
}

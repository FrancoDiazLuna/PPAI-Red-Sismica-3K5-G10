using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace PPAI_Red_Sismica_3K5_G10.Presentacion
{
    public partial class PantallaOrdenesFinalizadas : Form
    {
        public PantallaOrdenesFinalizadas()
        {
            InitializeComponent();
        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void button1_Click_1(object sender, EventArgs e)
        {
            PantallaPrincipal pPrincipal = new PantallaPrincipal();
            pPrincipal.ShowDialog();
        }

        private void PantallaOrdenesFinalizadas_Load(object sender, EventArgs e)
        {

        }
    }
}

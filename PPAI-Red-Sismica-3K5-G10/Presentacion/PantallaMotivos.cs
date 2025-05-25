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
    public partial class PantallaMotivos : Form
    {
        public PantallaMotivos()
        {
            InitializeComponent();
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            //btnActualizar
            //string cuadroTextoObs = textBox1.Text; 
        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void button1_Click_1(object sender, EventArgs e)
        {
            MessageBox.Show("¿Desea cerrar la orden de inspección?", 
                            "Confirmar", 
                            MessageBoxButtons.YesNo, 
                            MessageBoxIcon.Warning );
           
        }
    }
}

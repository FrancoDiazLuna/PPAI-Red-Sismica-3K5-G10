using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using PPAI_Red_Sismica_3K5_G10.Entidades;

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
            this.Close();
        }

        private void PantallaOrdenesFinalizadas_Load(object sender, EventArgs e)
        {

        }

        private void cargarDataGridView(object sender)
        {
            List<OrdenDeInspeccion> ordenesDeInspeccion = new List<OrdenDeInspeccion>();
            ordenesDeInspeccion = (List<OrdenDeInspeccion>)sender;  
            foreach(var ordenes in ordenesDeInspeccion )
            {
                dataGridView1.Rows.Add(
                                       ordenes.getEstacionSismologica().getSismografo().getIdentificadorSismografo(),
                                       ordenes.getNroOrden(),
                                       ordenes.getEstacionSismologica().getNombre(),
                                       ordenes.getFechaHoraCierre()?.ToString("dd/MM/yyyy") ?? "",
                                       ordenes.getFechaHoraCierre()?.ToString("HH:mm") ?? "",
                                       ordenes.getEstacionSismologica().getSismografo().getEstadoActual().getNombreEstado()
                                       );
            }
        }
    }
}

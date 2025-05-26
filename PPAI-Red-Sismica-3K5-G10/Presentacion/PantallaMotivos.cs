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
    public partial class PantallaMotivos : Form
    {
        private List<DataGridViewRow> filasSeleccionadas;
        public PantallaMotivos()
        {
            InitializeComponent();
            filasSeleccionadas = new List<DataGridViewRow>();
        }
        private void button1_Click(object sender, EventArgs e)
        {
            string cuadroTextoObs = txtObservacion.Text;
        }

        private void button1_Click_1(object sender, EventArgs e)
        {
            DialogResult result = MessageBox.Show("¿Desea cerrar la orden de inspección?",
                            "Confirmar",
                            MessageBoxButtons.YesNo,
                            MessageBoxIcon.Warning);


            envio_Notificacion(false, true);

            this.Close();

            
        }

        private void envio_Notificacion(bool mail, bool pantalla)
        {
            string message;

            if (mail && pantalla)
            {
                message = "Mail enviado a los responsables y mostrado por pantalla.";
            }
            else if (mail)
            {
                message = "Mail enviado a los responsables.";
            }
            else if (pantalla)
            {
                message = "Mostrado por pantalla.";
            }
            else
            {
                message = "No se pudo enviar email ni mostrar por pantalla.";
            }
            MessageBox.Show("Orden de inspección cerrada y actualizada." + "\n" +
                                message,
                                "Éxito",
                                MessageBoxButtons.OK,
                                MessageBoxIcon.Information);
        }
        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            // Verificar que sea la columna del checkbox
            if (dataGridView1.Columns[e.ColumnIndex].Name == "seleccionado" && e.RowIndex >= 0)
            {
                // Confirmar el cambio inmediatamente
                dataGridView1.CommitEdit(DataGridViewDataErrorContexts.Commit);
            }
        }
        private void dataGridView1_CellValueChanged(object sender, DataGridViewCellEventArgs e)
        {
            if (e.RowIndex >= 0 && dataGridView1.Columns[e.ColumnIndex].Name == "seleccionado")
            {
                DataGridViewRow fila = dataGridView1.Rows[e.RowIndex];

                bool estaSeleccionada = false;
                if (fila.Cells["seleccionado"].Value != null)
                {
                   estaSeleccionada = Convert.ToBoolean(fila.Cells["seleccionado"].Value);
                }

                if (estaSeleccionada)
                {
                    if (!filasSeleccionadas.Contains(fila))
                    {
                        filasSeleccionadas.Add(fila);
                    }
                }
                else
                {
                    if (filasSeleccionadas.Contains(fila))
                    {
                        filasSeleccionadas.Remove(fila);
                     }
                }

                if (filasSeleccionadas.Count > 0)
                {
                    btnConfirmar.Enabled = true;
                }
                else
                {
                    btnConfirmar.Enabled = false;
                }
            }
        }

        public void cargar_dataGridView(object sender) 
        {
            List<MotivoTipo> motivoTipos = new List<MotivoTipo>();
            motivoTipos = (List<MotivoTipo>)sender;
            foreach(var mT in motivoTipos)
            {   
                dataGridView1.Rows.Add(mT.getDescripcion());
            }
        }
    }
}

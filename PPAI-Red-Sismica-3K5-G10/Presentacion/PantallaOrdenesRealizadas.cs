﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;
using PPAI_Red_Sismica_3K5_G10.Entidades;

namespace PPAI_Red_Sismica_3K5_G10.Presentacion
{
    public partial class PantallaOrdenesRealizadas : Form
    {
        public PantallaOrdenesRealizadas()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            //btnSiguiente
            PantallaMotivos pMotivos = new PantallaMotivos();
            pMotivos.ShowDialog();
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void button1_Click_1(object sender, EventArgs e)
        {
            //btnVolver
            this.Close();   
        }

        private void cargarDataGridView(object sender)
        {
            List<OrdenDeInspeccion> ordenesDeInspeccion = new List<OrdenDeInspeccion>();
            ordenesDeInspeccion = (List<OrdenDeInspeccion>)sender;  
            foreach(var ordenes in ordenesDeInspeccion )
            {
               dataGridView1.Rows.Add(
                                      ordenes.getEstacionSismologica().getSismografos().First().getIdentificadorSismografo(),
                                      ordenes.getNroOrden(),
                                      ordenes.getEstacionSismologica().getNombre(),
                                      ordenes.getFechaHoraFinalizacion()
                                      );
            }
        }
    }
}

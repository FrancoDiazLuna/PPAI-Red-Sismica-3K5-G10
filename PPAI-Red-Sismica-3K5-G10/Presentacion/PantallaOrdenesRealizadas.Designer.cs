﻿namespace PPAI_Red_Sismica_3K5_G10.Presentacion
{
    partial class PantallaOrdenesRealizadas
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(PantallaOrdenesRealizadas));
            this.label1 = new System.Windows.Forms.Label();
            this.btnSiguientee = new System.Windows.Forms.Button();
            this.dataGridView1 = new System.Windows.Forms.DataGridView();
            this.checkbox = new System.Windows.Forms.DataGridViewCheckBoxColumn();
            this.idSismografo = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.numeroOrden = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.estacionSismologica = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.fechaFinalizacion = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.btnVolver = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).BeginInit();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(271, 7);
            this.label1.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(365, 37);
            this.label1.TabIndex = 0;
            this.label1.Text = "Ordenes de Inspección";
            this.label1.Click += new System.EventHandler(this.label1_Click);
            // 
            // btnSiguientee
            // 
            this.btnSiguientee.BackColor = System.Drawing.Color.SteelBlue;
            this.btnSiguientee.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnSiguientee.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.2F, System.Drawing.FontStyle.Bold);
            this.btnSiguientee.ForeColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.btnSiguientee.Location = new System.Drawing.Point(765, 499);
            this.btnSiguientee.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.btnSiguientee.Name = "btnSiguientee";
            this.btnSiguientee.Size = new System.Drawing.Size(98, 28);
            this.btnSiguientee.TabIndex = 1;
            this.btnSiguientee.Text = "Siguiente";
            this.btnSiguientee.UseVisualStyleBackColor = false;
            this.btnSiguientee.Click += new System.EventHandler(this.button1_Click);
            // 
            // dataGridView1
            // 
            this.dataGridView1.AllowUserToAddRows = false;
            this.dataGridView1.AllowUserToDeleteRows = false;
            this.dataGridView1.BackgroundColor = System.Drawing.Color.SteelBlue;
            this.dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridView1.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.checkbox,
            this.idSismografo,
            this.numeroOrden,
            this.estacionSismologica,
            this.fechaFinalizacion});
            this.dataGridView1.Location = new System.Drawing.Point(112, 58);
            this.dataGridView1.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.dataGridView1.Name = "dataGridView1";
            this.dataGridView1.ReadOnly = true;
            this.dataGridView1.RowHeadersWidth = 51;
            this.dataGridView1.RowTemplate.Height = 24;
            this.dataGridView1.Size = new System.Drawing.Size(697, 411);
            this.dataGridView1.TabIndex = 2;
            this.dataGridView1.CellContentClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridView1_CellContentClick);
            // 
            // checkbox
            // 
            this.checkbox.FillWeight = 200F;
            this.checkbox.HeaderText = "";
            this.checkbox.MinimumWidth = 8;
            this.checkbox.Name = "checkbox";
            this.checkbox.ReadOnly = true;
            this.checkbox.Width = 125;
            // 
            // idSismografo
            // 
            this.idSismografo.HeaderText = "ID Sismógrafo";
            this.idSismografo.MinimumWidth = 6;
            this.idSismografo.Name = "idSismografo";
            this.idSismografo.ReadOnly = true;
            this.idSismografo.Width = 150;
            // 
            // numeroOrden
            // 
            this.numeroOrden.HeaderText = "Número De Orden";
            this.numeroOrden.MinimumWidth = 6;
            this.numeroOrden.Name = "numeroOrden";
            this.numeroOrden.ReadOnly = true;
            this.numeroOrden.Width = 200;
            // 
            // estacionSismologica
            // 
            this.estacionSismologica.HeaderText = "Estación  Sismológica";
            this.estacionSismologica.MinimumWidth = 6;
            this.estacionSismologica.Name = "estacionSismologica";
            this.estacionSismologica.ReadOnly = true;
            this.estacionSismologica.Width = 200;
            // 
            // fechaFinalizacion
            // 
            this.fechaFinalizacion.HeaderText = "Fecha Finalización ";
            this.fechaFinalizacion.MinimumWidth = 6;
            this.fechaFinalizacion.Name = "fechaFinalizacion";
            this.fechaFinalizacion.ReadOnly = true;
            this.fechaFinalizacion.Width = 200;
            // 
            // btnVolver
            // 
            this.btnVolver.BackColor = System.Drawing.Color.SteelBlue;
            this.btnVolver.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnVolver.Font = new System.Drawing.Font("Microsoft Sans Serif", 10.2F, System.Drawing.FontStyle.Bold);
            this.btnVolver.ForeColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.btnVolver.Location = new System.Drawing.Point(648, 499);
            this.btnVolver.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.btnVolver.Name = "btnVolver";
            this.btnVolver.Size = new System.Drawing.Size(98, 28);
            this.btnVolver.TabIndex = 3;
            this.btnVolver.Text = "Volver";
            this.btnVolver.UseVisualStyleBackColor = false;
            this.btnVolver.Click += new System.EventHandler(this.button1_Click_1);
            // 
            // PantallaOrdenesRealizadas
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.ClientSize = new System.Drawing.Size(886, 547);
            this.Controls.Add(this.btnVolver);
            this.Controls.Add(this.dataGridView1);
            this.Controls.Add(this.btnSiguientee);
            this.Controls.Add(this.label1);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.Name = "PantallaOrdenesRealizadas";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Ordenes de Inspeccion";
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button btnSiguientee;
        private System.Windows.Forms.DataGridView dataGridView1;
        private System.Windows.Forms.DataGridViewCheckBoxColumn checkbox;
        private System.Windows.Forms.DataGridViewTextBoxColumn idSismografo;
        private System.Windows.Forms.DataGridViewTextBoxColumn numeroOrden;
        private System.Windows.Forms.DataGridViewTextBoxColumn estacionSismologica;
        private System.Windows.Forms.DataGridViewTextBoxColumn fechaFinalizacion;
        private System.Windows.Forms.Button btnVolver;
    }
}
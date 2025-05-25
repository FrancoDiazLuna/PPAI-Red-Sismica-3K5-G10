namespace PPAI_Red_Sismica_3K5_G10.Presentacion
{
    partial class PantallaOrdenesFinalizadas
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(PantallaOrdenesFinalizadas));
            this.label1 = new System.Windows.Forms.Label();
            this.dataGridView1 = new System.Windows.Forms.DataGridView();
            this.idSismografo = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.numeroOrden = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.estacionSismológica = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.fechaCierre = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.horaCierre = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.estadoSismografo = new System.Windows.Forms.DataGridViewTextBoxColumn();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).BeginInit();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Noto Sans", 22.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(380, 25);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(447, 57);
            this.label1.TabIndex = 0;
            this.label1.Text = "Ordenes De Inspección";
            // 
            // dataGridView1
            // 
            this.dataGridView1.AllowUserToAddRows = false;
            this.dataGridView1.AllowUserToDeleteRows = false;
            this.dataGridView1.BackgroundColor = System.Drawing.Color.SteelBlue;
            this.dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridView1.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.idSismografo,
            this.numeroOrden,
            this.estacionSismológica,
            this.fechaCierre,
            this.horaCierre,
            this.estadoSismografo});
            this.dataGridView1.Location = new System.Drawing.Point(128, 116);
            this.dataGridView1.Name = "dataGridView1";
            this.dataGridView1.ReadOnly = true;
            this.dataGridView1.RowHeadersWidth = 51;
            this.dataGridView1.RowTemplate.Height = 24;
            this.dataGridView1.Size = new System.Drawing.Size(954, 454);
            this.dataGridView1.TabIndex = 1;
            this.dataGridView1.CellContentClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridView1_CellContentClick);
            // 
            // idSismografo
            // 
            this.idSismografo.HeaderText = "ID Sismografo";
            this.idSismografo.MinimumWidth = 6;
            this.idSismografo.Name = "idSismografo";
            this.idSismografo.ReadOnly = true;
            this.idSismografo.Width = 150;
            // 
            // numeroOrden
            // 
            this.numeroOrden.HeaderText = "Numero De Orden";
            this.numeroOrden.MinimumWidth = 6;
            this.numeroOrden.Name = "numeroOrden";
            this.numeroOrden.ReadOnly = true;
            this.numeroOrden.Width = 150;
            // 
            // estacionSismológica
            // 
            this.estacionSismológica.HeaderText = "Estación Sismológica";
            this.estacionSismológica.MinimumWidth = 6;
            this.estacionSismológica.Name = "estacionSismológica";
            this.estacionSismológica.ReadOnly = true;
            this.estacionSismológica.Width = 150;
            // 
            // fechaCierre
            // 
            this.fechaCierre.HeaderText = "Fecha De Cierre";
            this.fechaCierre.MinimumWidth = 6;
            this.fechaCierre.Name = "fechaCierre";
            this.fechaCierre.ReadOnly = true;
            this.fechaCierre.Width = 150;
            // 
            // horaCierre
            // 
            this.horaCierre.HeaderText = "Hora De Cierre";
            this.horaCierre.MinimumWidth = 6;
            this.horaCierre.Name = "horaCierre";
            this.horaCierre.ReadOnly = true;
            this.horaCierre.Width = 150;
            // 
            // estadoSismografo
            // 
            this.estadoSismografo.HeaderText = "Estado Sismografo";
            this.estadoSismografo.MinimumWidth = 6;
            this.estadoSismografo.Name = "estadoSismografo";
            this.estadoSismografo.ReadOnly = true;
            this.estadoSismografo.Width = 150;
            // 
            // PantallaOrdenesFinalizadas
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.ClientSize = new System.Drawing.Size(1182, 673);
            this.Controls.Add(this.dataGridView1);
            this.Controls.Add(this.label1);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "PantallaOrdenesFinalizadas";
            this.Text = "Ordenes Finalizadas";
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.DataGridView dataGridView1;
        private System.Windows.Forms.DataGridViewTextBoxColumn idSismografo;
        private System.Windows.Forms.DataGridViewTextBoxColumn numeroOrden;
        private System.Windows.Forms.DataGridViewTextBoxColumn estacionSismológica;
        private System.Windows.Forms.DataGridViewTextBoxColumn fechaCierre;
        private System.Windows.Forms.DataGridViewTextBoxColumn horaCierre;
        private System.Windows.Forms.DataGridViewTextBoxColumn estadoSismografo;
    }
}
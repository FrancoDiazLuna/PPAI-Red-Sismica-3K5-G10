import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class EstacionSismologica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  codigoEstacion: string;

  @Column()
  latitud: string;

  @Column()
  longitud: string;

  @Column()
  documentoCertificacionAdq: string;

  @Column()
  nroCertificacionAdquision: string;

  @Column({ type: "datetime" })
  fechaSolicitudCertificacion: Date;
}

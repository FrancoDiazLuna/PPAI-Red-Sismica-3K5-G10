import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { EstacionSismologica } from "../../estaciones-sismologicas/entities/estacion-sismologica.entity";
import { Sismografo } from "../../sismografos/entities/sismografo.entity";
import { ResponsableInspeccion } from "../../responsables-inspeccion/entities/responsable-inspeccion.entity";
import { ObservacionCierre } from "../../observaciones-cierre/entities/observacion-cierre.entity";

export enum EstadoOrdenInspeccion {
  PENDIENTE = "pendiente",
  REALIZADA = "realizada",
  CERRADA = "cerrada",
}

@Entity()
export class OrdenInspeccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "datetime" })
  fechaCreacion: Date;

  @Column({ type: "datetime", nullable: true })
  fechaFinalizacion: Date;

  @Column({
    type: "varchar",
    enum: EstadoOrdenInspeccion,
    default: EstadoOrdenInspeccion.PENDIENTE,
  })
  estado: EstadoOrdenInspeccion;

  @ManyToOne(() => EstacionSismologica)
  estacionSismologica: EstacionSismologica;

  @ManyToOne(() => Sismografo)
  sismografo: Sismografo;

  @ManyToOne(() => ResponsableInspeccion)
  responsable: ResponsableInspeccion;

  @Column({ nullable: true })
  resultadoInspeccion: string;

  @OneToMany(() => ObservacionCierre, (observacion) => observacion.ordenInspeccion)
  observacionesCierre: ObservacionCierre[];

  @Column({ type: "datetime", nullable: true })
  fechaCierre: Date;
}

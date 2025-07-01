import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { EstacionSismologica } from "../../estaciones/entities/estacion.entity";
import { Sismografo } from "../../estaciones/entities/sismografo.entity";
import { ResponsableInspeccion } from "./responsable-inspeccion.entity";
import { ObservacionCierre } from "./observacion-cierre.entity";

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

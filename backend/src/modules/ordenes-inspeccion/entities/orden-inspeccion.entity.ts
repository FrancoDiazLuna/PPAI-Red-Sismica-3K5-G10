import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { EstacionSismologica } from "../../estaciones-sismologicas/entities/estacion-sismologica.entity";
import { Estado } from "../../estados/entities/estado.entity";
import { ResponsableInspeccion } from "../../responsables-inspeccion/entities/responsable-inspeccion.entity";

@Entity()
export class OrdenDeInspeccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nroOrden: string;

  @Column({ type: "datetime" })
  fechaHoraInicio: Date;

  @Column({ type: "datetime", nullable: true })
  fechaHoraFinalizacion: Date;

  @Column({ type: "datetime", nullable: true })
  fechaHoraCierre: Date;

  @Column({ nullable: true })
  observacionCierre: string;

  @ManyToOne(() => Estado)
  estado: Estado;

  @ManyToOne(() => EstacionSismologica)
  estacionSismologica: EstacionSismologica;

  @ManyToOne(() => ResponsableInspeccion, (responsable) => responsable.ordenesInspeccion)
  responsable: ResponsableInspeccion;
}

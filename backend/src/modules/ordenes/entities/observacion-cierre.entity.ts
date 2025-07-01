import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { OrdenInspeccion } from "./orden-inspeccion.entity";
import { MotivoFueraServicio } from "../../estaciones/entities/motivo-fuera-servicio.entity";

@Entity()
export class ObservacionCierre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  texto: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  fechaHora: Date;

  @ManyToOne(() => OrdenInspeccion, orden => orden.observacionesCierre)
  ordenInspeccion: OrdenInspeccion;

  @ManyToMany(() => MotivoFueraServicio)
  @JoinTable()
  motivos: MotivoFueraServicio[];
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { Estado } from "../../estados/entities/estado.entity";
import { MotivoFueraServicio } from "../../motivos-fuera-servicio/entities/motivo-fuera-servicio.entity";

@Entity()
export class CambioEstado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "datetime" })
  fechaHoraInicio: Date;

  @Column({ type: "datetime", nullable: true })
  fechaHoraFin: Date;

  @ManyToOne(() => Estado)
  estado: Estado;

  @ManyToOne(() => MotivoFueraServicio, { nullable: true })
  motivoFueraServicio: MotivoFueraServicio;
}

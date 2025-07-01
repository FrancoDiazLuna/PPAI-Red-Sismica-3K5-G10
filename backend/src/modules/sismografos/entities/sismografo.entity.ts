import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { EstacionSismologica } from "../../estaciones-sismologicas/entities/estacion-sismologica.entity";
import { MotivoFueraServicio } from "../../motivos-fuera-servicio/entities/motivo-fuera-servicio.entity";

export enum EstadoSismografo {
  EN_SERVICIO = "en_servicio",
  FUERA_SERVICIO = "fuera_servicio",
}

@Entity()
export class Sismografo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  identificador: string;

  @Column({
    type: "varchar",
    enum: EstadoSismografo,
    default: EstadoSismografo.EN_SERVICIO,
  })
  estado: EstadoSismografo;

  @Column({ type: "datetime", nullable: true })
  fechaUltimoCambioEstado: Date;

  @ManyToOne(() => EstacionSismologica, estacion => estacion.sismografos)
  estacion: EstacionSismologica;

  @ManyToMany(() => MotivoFueraServicio)
  @JoinTable()
  motivosFueraServicio: MotivoFueraServicio[];
}

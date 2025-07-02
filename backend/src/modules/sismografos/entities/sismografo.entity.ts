import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { EstacionSismologica } from "../../estaciones-sismologicas/entities/estacion-sismologica.entity";
import { CambioEstado } from "./cambio-estado.entity";
import { MotivoFueraServicio } from "../../motivos-fuera-servicio/entities/motivo-fuera-servicio.entity";

@Entity()
export class Sismografo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  identificadorSismografo: string;

  @Column()
  nroSerie: string;

  @Column({ type: "datetime" })
  fechaAdquisicion: Date;

  @Column({ nullable: true })
  estado: string;

  @Column({ type: "datetime", nullable: true })
  fechaUltimoCambioEstado: Date;

  @ManyToOne(() => EstacionSismologica)
  estacionSismologica: EstacionSismologica;

  @OneToOne(() => CambioEstado)
  @JoinColumn()
  cambioEstado: CambioEstado;

  @ManyToMany(() => MotivoFueraServicio)
  @JoinTable()
  motivosFueraServicio: MotivoFueraServicio[];
}

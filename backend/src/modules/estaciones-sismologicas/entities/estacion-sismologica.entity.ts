import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Sismografo } from "../../sismografos/entities/sismografo.entity";

@Entity()
export class EstacionSismologica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  ubicacion: string;

  @Column({ default: true })
  activa: boolean;

  @OneToMany(() => Sismografo, sismografo => sismografo.estacion)
  sismografos: Sismografo[];
}

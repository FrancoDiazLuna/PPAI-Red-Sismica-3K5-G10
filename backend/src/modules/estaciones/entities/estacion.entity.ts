import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

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

  @OneToMany("Sismografo", "estacion")
  sismografos: any[];
}

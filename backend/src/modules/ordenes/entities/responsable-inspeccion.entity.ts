import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { OrdenInspeccion } from "./orden-inspeccion.entity";

@Entity()
export class ResponsableInspeccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  usuario: string;

  @Column()
  email: string;

  @OneToMany(() => OrdenInspeccion, (orden) => orden.responsable)
  ordenesInspeccion: OrdenInspeccion[];
}

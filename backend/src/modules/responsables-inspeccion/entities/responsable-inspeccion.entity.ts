import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { OrdenDeInspeccion } from "../../ordenes-inspeccion/entities/orden-inspeccion.entity";

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

  @OneToMany(() => OrdenDeInspeccion, (orden) => orden.responsable)
  ordenesInspeccion: OrdenDeInspeccion[];
}

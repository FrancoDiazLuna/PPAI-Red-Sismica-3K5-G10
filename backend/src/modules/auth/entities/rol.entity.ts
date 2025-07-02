import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Empleado } from "./empleado.entity";

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcionRol: string;

  @OneToMany(() => Empleado, (empleado) => empleado.rol)
  empleados: Empleado[];
}

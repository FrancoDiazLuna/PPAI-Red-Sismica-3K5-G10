import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";

import { Rol } from "./rol.entity";
import { Usuario } from "./usuario.entity";

@Entity()
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  mail: string;

  @Column()
  telefono: string;

  @ManyToOne(() => Rol, (rol) => rol.empleados)
  @JoinColumn()
  rol: Rol;

  @OneToOne(() => Usuario, (usuario) => usuario.empleado)
  usuario: Usuario;
}

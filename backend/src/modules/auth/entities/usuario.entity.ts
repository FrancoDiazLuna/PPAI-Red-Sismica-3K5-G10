import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import * as bcrypt from "bcrypt";

import { Empleado } from "./empleado.entity";
import { Sesion } from "./sesion.entity";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombreUsuario: string;

  @Column()
  contraseña: string;

  @OneToOne(() => Empleado, (empleado) => empleado.usuario)
  @JoinColumn()
  empleado: Empleado;

  @OneToMany(() => Sesion, (sesion) => sesion.usuario)
  sesiones: Sesion[];

  @BeforeInsert()
  async hashPassword() {
    this.contraseña = await bcrypt.hash(this.contraseña, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.contraseña);
  }
}

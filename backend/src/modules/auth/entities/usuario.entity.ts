import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcrypt';

export enum RolUsuario {
  ADMIN = "admin",
  RESPONSABLE_INSPECCION = "responsable_inspeccion",
  SUPERVISOR = "supervisor"
}

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({
    type: "varchar",
    enum: RolUsuario,
    default: RolUsuario.RESPONSABLE_INSPECCION,
  })
  rol: RolUsuario;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

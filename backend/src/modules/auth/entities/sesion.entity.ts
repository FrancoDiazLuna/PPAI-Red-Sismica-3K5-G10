import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

import { Usuario } from "./usuario.entity";

@Entity()
export class Sesion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "datetime" })
  fechaHoraInicio: Date;

  @Column({ type: "datetime", nullable: true })
  fechaHoraFin: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.sesiones)
  @JoinColumn()
  usuario: Usuario;
}

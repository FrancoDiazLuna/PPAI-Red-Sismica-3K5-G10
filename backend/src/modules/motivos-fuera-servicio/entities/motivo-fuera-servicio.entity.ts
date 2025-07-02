import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { MotivoTipo } from "./motivo-tipo.entity";

@Entity()
export class MotivoFueraServicio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comentario: string;

  @ManyToOne(() => MotivoTipo)
  motivoTipo: MotivoTipo;
}

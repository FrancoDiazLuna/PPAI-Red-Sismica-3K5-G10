import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MotivoTipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;
}

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MotivoFueraServicio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column()
  tipo: string;
}

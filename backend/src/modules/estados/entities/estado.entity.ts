import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Estado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ambito: string;

  @Column()
  nombreEstado: string;
}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Estado } from "./entities/estado.entity";
import { EstadosService } from "./estados.service";

@Module({
  imports: [TypeOrmModule.forFeature([Estado])],
  providers: [EstadosService],
  exports: [EstadosService],
})
export class EstadosModule {}

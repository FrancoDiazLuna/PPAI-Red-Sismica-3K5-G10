import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sismografo } from "./entities/sismografo.entity";
import { CambioEstado } from "./entities/cambio-estado.entity";
import { Estado } from "../estados/entities/estado.entity";
import { SismografoService } from "./sismografo.service";

@Module({
  imports: [TypeOrmModule.forFeature([Sismografo, CambioEstado, Estado])],
  providers: [SismografoService],
  exports: [SismografoService],
})
export class SismografosModule {}

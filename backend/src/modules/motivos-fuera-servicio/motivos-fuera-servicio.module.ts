import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MotivoFueraServicio } from "./entities/motivo-fuera-servicio.entity";
import { MotivoFueraServicioService } from "./motivo-fuera-servicio.service";

@Module({
  imports: [TypeOrmModule.forFeature([MotivoFueraServicio])],
  providers: [MotivoFueraServicioService],
  exports: [MotivoFueraServicioService],
})
export class MotivosFueraServicioModule {}

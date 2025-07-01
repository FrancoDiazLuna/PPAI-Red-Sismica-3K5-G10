import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EstacionSismologica } from "./entities/estacion.entity";
import { Sismografo } from "./entities/sismografo.entity";
import { MotivoFueraServicio } from "./entities/motivo-fuera-servicio.entity";
import { MotivoFueraServicioService } from "./services/motivo-fuera-servicio.service";
import { MotivoFueraServicioController } from "./controllers/motivo-fuera-servicio.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EstacionSismologica,
      Sismografo,
      MotivoFueraServicio,
    ]),
  ],
  controllers: [MotivoFueraServicioController],
  providers: [MotivoFueraServicioService],
  exports: [MotivoFueraServicioService, TypeOrmModule],
})
export class EstacionesModule {}

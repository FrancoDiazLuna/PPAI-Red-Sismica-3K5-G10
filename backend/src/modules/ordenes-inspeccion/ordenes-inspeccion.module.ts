import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdenInspeccion } from "./entities/orden-inspeccion.entity";
import { OrdenInspeccionService } from "./orden-inspeccion.service";
import { ObservacionCierre } from "../observaciones-cierre/entities/observacion-cierre.entity";
import { MotivoFueraServicio } from "../motivos-fuera-servicio/entities/motivo-fuera-servicio.entity";
import { Sismografo } from "../sismografos/entities/sismografo.entity";
import { NotificacionesModule } from "../notificaciones/notificaciones.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdenInspeccion, ObservacionCierre, MotivoFueraServicio, Sismografo]),
    NotificacionesModule,
  ],
  providers: [OrdenInspeccionService],
  exports: [OrdenInspeccionService],
})
export class OrdenesInspeccionModule {}

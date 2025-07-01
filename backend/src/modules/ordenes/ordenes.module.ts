import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdenInspeccion } from "./entities/orden-inspeccion.entity";
import { ResponsableInspeccion } from "./entities/responsable-inspeccion.entity";
import { ObservacionCierre } from "./entities/observacion-cierre.entity";
import { OrdenInspeccionService } from "./orden-inspeccion.service";
import { NotificacionService } from "./notificacion.service";
import { EstacionesModule } from "../estaciones/estaciones.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdenInspeccion, ResponsableInspeccion, ObservacionCierre]),
    EstacionesModule,
  ],
  controllers: [],
  providers: [OrdenInspeccionService, NotificacionService],
  exports: [OrdenInspeccionService, NotificacionService],
})
export class OrdenesModule {}

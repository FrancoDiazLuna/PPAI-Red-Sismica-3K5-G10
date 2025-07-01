import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdenInspeccion } from "./entities/orden-inspeccion.entity";
import { ResponsableInspeccion } from "./entities/responsable-inspeccion.entity";
import { ObservacionCierre } from "./entities/observacion-cierre.entity";
import { OrdenInspeccionService } from "./services/orden-inspeccion.service";
import { NotificacionService } from "./services/notificacion.service";
import { OrdenInspeccionController } from "./controllers/orden-inspeccion.controller";
import { EstacionesModule } from "../estaciones/estaciones.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdenInspeccion, ResponsableInspeccion, ObservacionCierre]),
    EstacionesModule,
  ],
  controllers: [OrdenInspeccionController],
  providers: [OrdenInspeccionService, NotificacionService],
  exports: [OrdenInspeccionService, NotificacionService],
})
export class OrdenesModule {}

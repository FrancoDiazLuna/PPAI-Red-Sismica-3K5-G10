import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GestorCerrarOrdenDeInspeccionController } from "./controllers/gestor-cerrar-orden-de-inspeccion.controller";
import { GestorCerrarOrdenDeInspeccionService } from "./services/gestor-cerrar-orden-de-inspeccion.service";
import { OrdenInspeccion } from "../ordenes/entities/orden-inspeccion.entity";
import { ObservacionCierre } from "../ordenes/entities/observacion-cierre.entity";
import { MotivoFueraServicio } from "../estaciones/entities/motivo-fuera-servicio.entity";
import { Sismografo } from "../estaciones/entities/sismografo.entity";
import { NotificacionService } from "../ordenes/services/notificacion.service";
import { OrdenesModule } from "../ordenes/ordenes.module";
import { EstacionesModule } from "../estaciones/estaciones.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdenInspeccion,
      ObservacionCierre,
      MotivoFueraServicio,
      Sismografo
    ]),
    OrdenesModule,
    EstacionesModule
  ],
  controllers: [GestorCerrarOrdenDeInspeccionController],
  providers: [GestorCerrarOrdenDeInspeccionService],
  exports: [GestorCerrarOrdenDeInspeccionService]
})
export class GestoresModule {}

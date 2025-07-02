import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GestorCerrarOrdenDeInspeccionController } from "./gestor-cerrar-orden-de-inspeccion.controller";
import { GestorCerrarOrdenDeInspeccionService } from "./gestor-cerrar-orden-de-inspeccion.service";
import { OrdenDeInspeccion } from "../ordenes-inspeccion/entities/orden-inspeccion.entity";
import { MotivoFueraServicio } from "../motivos-fuera-servicio/entities/motivo-fuera-servicio.entity";
import { Sismografo } from "../sismografos/entities/sismografo.entity";
import { CambioEstado } from "../sismografos/entities/cambio-estado.entity";
import { Sesion } from "../auth/entities/sesion.entity";
import { NotificacionesModule } from "../notificaciones/notificaciones.module";
import { OrdenesInspeccionModule } from "../ordenes-inspeccion/ordenes-inspeccion.module";
import { EstadosModule } from "../estados/estados.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdenDeInspeccion,
      MotivoFueraServicio,
      Sismografo,
      CambioEstado,
      Sesion,
    ]),
    OrdenesInspeccionModule,
    NotificacionesModule,
    EstadosModule,
  ],
  controllers: [GestorCerrarOrdenDeInspeccionController],
  providers: [GestorCerrarOrdenDeInspeccionService],
  exports: [GestorCerrarOrdenDeInspeccionService],
})
export class GestoresModule {}

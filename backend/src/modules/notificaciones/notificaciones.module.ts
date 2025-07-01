import { Module } from "@nestjs/common";
import { NotificacionService } from "./notificacion.service";

@Module({
  providers: [NotificacionService],
  exports: [NotificacionService],
})
export class NotificacionesModule {}

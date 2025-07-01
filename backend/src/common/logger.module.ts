import { Global, Module } from "@nestjs/common";
import { CustomLoggerService } from "./services/logger.service";

/**
 * Módulo global para el servicio de logger personalizado
 * Al ser global, no es necesario importarlo en cada módulo
 */
@Global()
@Module({
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class LoggerModule {}

import { Injectable } from "@nestjs/common";
import { OrdenDeInspeccion } from "../ordenes-inspeccion/entities/orden-inspeccion.entity";
import { CustomLoggerService } from "../../common/services/logger.service";

@Injectable()
export class NotificacionService {
  private readonly logger = new CustomLoggerService("NotificacionService");

  constructor() {}

  enviarNotificacionCierreOrden(orden: OrdenDeInspeccion): void {
    this.logger.log(`Enviando notificación de cierre de orden ${orden.id}`);

    const asunto = `ALERTA: Sismógrafo fuera de servicio - Estación ${orden.estacionSismologica?.nombre || "No especificada"}`;
    const mensaje = `
      Se ha registrado un sismógrafo fuera de servicio
      
      Estación: ${orden.estacionSismologica?.nombre || "No especificada"}
      Fecha: ${orden.fechaHoraCierre?.toLocaleString() || new Date().toLocaleString()}
      
      Observaciones:
      ${orden.observacionCierre || "Sin observaciones"}
    `;

    this.logger.log("Publicando en monitores CORS");
    this.logger.debug(`Mensaje para monitores CORS: ${mensaje}`);

    this.logger.log("Enviando correo electrónico a responsables de operaciones");
    this.logger.log(`Correo simulado - Asunto: ${asunto}`);
    this.logger.debug(`Contenido del correo: ${mensaje}`);
  }
}

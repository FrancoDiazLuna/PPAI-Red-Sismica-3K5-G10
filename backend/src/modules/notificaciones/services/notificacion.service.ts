import { Injectable } from "@nestjs/common";
import { OrdenInspeccion } from "../../ordenes-inspeccion/entities/orden-inspeccion.entity";
import { ObservacionCierre } from "../../observaciones-cierre/entities/observacion-cierre.entity";
import { CustomLoggerService } from "../../../common/services/logger.service";

@Injectable()
export class NotificacionService {
  private readonly logger = new CustomLoggerService("NotificacionService");

  constructor() {}

  async enviarNotificacionCierreOrden(
    orden: OrdenInspeccion,
    observacionCierre: ObservacionCierre
  ): Promise<void> {
    this.logger.log(`Enviando notificación de cierre de orden ${orden.id}`);

    // Simulación de envío de correo electrónico
    this.enviarCorreoElectronico(orden, observacionCierre);

    // Simulación de publicación en monitores CORS
    this.publicarEnMonitoresCORS(orden, observacionCierre);
  }

  private enviarCorreoElectronico(
    orden: OrdenInspeccion,
    observacionCierre: ObservacionCierre
  ): void {
    this.logger.log("Enviando correo electrónico a responsables de operaciones");

    // En una implementación real, aquí se enviaría un correo electrónico
    // utilizando un servicio como Nodemailer o SendGrid
    
    const asunto = `Sismógrafo fuera de servicio - Estación ${orden.estacionSismologica.nombre}`;
    const mensaje = `
      Se ha registrado un sismógrafo fuera de servicio:
      
      - Estación Sismológica: ${orden.estacionSismologica.nombre}
      - Sismógrafo: ${orden.sismografo.identificador}
      - Fecha de registro: ${observacionCierre.fechaHora}
      - Responsable: ${orden.responsable.nombre}
      
      Observación: ${observacionCierre.texto}
      
      Motivos:
      ${observacionCierre.motivos.map(m => `- ${m.descripcion}`).join("\n")}
    `;

    this.logger.log(`Correo simulado - Asunto: ${asunto}`);
    this.logger.debug(`Contenido del correo: ${mensaje}`);
  }

  private publicarEnMonitoresCORS(
    orden: OrdenInspeccion,
    observacionCierre: ObservacionCierre
  ): void {
    this.logger.log("Publicando en monitores CORS");

    // En una implementación real, aquí se publicaría en los monitores CORS
    // posiblemente mediante una API o un sistema de mensajería

    const mensaje = {
      tipo: "SISMOGRAFO_FUERA_SERVICIO",
      estacion: orden.estacionSismologica.nombre,
      sismografo: orden.sismografo.identificador,
      fecha: observacionCierre.fechaHora,
      responsable: orden.responsable.nombre,
      observacion: observacionCierre.texto,
      motivos: observacionCierre.motivos.map(m => m.descripcion)
    };

    this.logger.debug(`Mensaje para monitores CORS: ${JSON.stringify(mensaje)}`);
  }
}

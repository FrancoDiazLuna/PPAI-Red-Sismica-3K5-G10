import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  OrdenInspeccion,
  EstadoOrdenInspeccion,
} from "../ordenes/entities/orden-inspeccion.entity";
import { ObservacionCierre } from "../ordenes/entities/observacion-cierre.entity";
import { MotivoFueraServicio } from "../estaciones/entities/motivo-fuera-servicio.entity";
import { Sismografo, EstadoSismografo } from "../estaciones/entities/sismografo.entity";
import { CustomLoggerService } from "../../common/services/logger.service";
import { NotificacionService } from "../ordenes/notificacion.service";

/**
 * Servicio para el caso de uso "Dar cierre a orden de inspección de ES"
 *
 * Este servicio implementa la lógica de negocio para el flujo del caso de uso:
 * - Paso 1-2: Iniciar el proceso y buscar órdenes realizadas
 * - Paso 3-5: Obtener detalle de una orden y motivos disponibles
 * - Paso 6-13: Procesar el cierre de la orden, actualizar estados y enviar notificaciones
 */

@Injectable()
export class GestorCerrarOrdenDeInspeccionService {
  private readonly logger = new CustomLoggerService("GestorCerrarOrdenDeInspeccionService");

  constructor(
    @InjectRepository(OrdenInspeccion)
    private ordenInspeccionRepository: Repository<OrdenInspeccion>,
    @InjectRepository(ObservacionCierre)
    private observacionCierreRepository: Repository<ObservacionCierre>,
    @InjectRepository(MotivoFueraServicio)
    private motivoFueraServicioRepository: Repository<MotivoFueraServicio>,
    @InjectRepository(Sismografo)
    private sismografoRepository: Repository<Sismografo>,
    private notificacionService: NotificacionService,
  ) {}

  /**
   * Inicia el proceso de cierre de una orden de inspección
   *
   * Implementa los pasos 1-2 del caso de uso:
   * 1. RI selecciona "Cerrar Orden de Inspección"
   * 2. Sistema busca órdenes de inspección realizadas del RI
   *
   * @param responsableId ID del responsable de inspección
   * @returns Lista de órdenes realizadas por el responsable
   */
  async iniciarCierreOrden(responsableId: number): Promise<any> {
    this.logger.log(`Iniciando proceso de cierre de órdenes para el responsable ${responsableId}`);

    // Buscar órdenes realizadas por el responsable
    const ordenesRealizadas = await this.buscarOrdenesRealizadasPorResponsable(responsableId);

    return {
      ordenesRealizadas: this.mapearOrdenesADTO(ordenesRealizadas),
    };
  }

  /**
   * Busca las órdenes en estado REALIZADA para un responsable específico
   *
   * Implementa el paso 2 del caso de uso:
   * 2. Sistema busca órdenes de inspección realizadas del RI
   *
   * Busca todas las órdenes que:
   * - Pertenecen al responsable especificado
   * - Están en estado REALIZADA
   * - Incluye las relaciones con estación sismológica, sismógrafo y responsable
   * - Ordenadas por fecha de finalización descendente
   *
   * @param responsableId ID del responsable de inspección
   * @returns Array de entidades OrdenInspeccion
   */
  private async buscarOrdenesRealizadasPorResponsable(
    responsableId: number,
  ): Promise<OrdenInspeccion[]> {
    return await this.ordenInspeccionRepository.find({
      where: {
        responsable: { id: responsableId },
        estado: EstadoOrdenInspeccion.REALIZADA,
      },
      relations: ["estacionSismologica", "sismografo", "responsable"],
      order: {
        fechaFinalizacion: "DESC",
      },
    });
  }

  /**
   * Obtiene los detalles de una orden de inspección específica
   *
   * Implementa los pasos 3-5 del caso de uso:
   * 3. RI selecciona una orden de inspección
   * 4. Sistema permite ingresar observación de cierre
   * 5. Sistema solicita seleccionar motivos para sismógrafo fuera de servicio
   *
   * @param ordenId ID de la orden de inspección seleccionada
   * @returns Detalles de la orden y lista de motivos disponibles
   */
  async obtenerDetalleOrden(ordenId: number): Promise<any> {
    this.logger.log(`Obteniendo detalle de la orden ${ordenId}`);

    const orden = await this.ordenInspeccionRepository.findOne({
      where: { id: ordenId },
      relations: ["estacionSismologica", "sismografo", "responsable"],
    });

    if (!orden) {
      throw new Error("Orden de inspección no encontrada");
    }

    // Obtener todos los motivos de fuera de servicio disponibles
    const motivosFueraServicio = await this.motivoFueraServicioRepository.find();

    return {
      orden: this.mapearOrdenADTO(orden),
      motivosFueraServicio: motivosFueraServicio.map((motivo) => ({
        id: motivo.id,
        descripcion: motivo.descripcion,
        tipo: motivo.tipo,
      })),
    };
  }

  /**
   * Registra el cierre de una orden de inspección
   *
   * Implementa los pasos 6-13 del caso de uso:
   * 6. RI selecciona motivos e ingresa comentarios
   * 7. RI confirma cierre
   * 8. Sistema valida datos y registra cierre
   * 9. Sistema actualiza estado del sismógrafo a fuera de servicio
   * 10. Sistema envía notificaciones a responsables
   * 11. Sistema actualiza la orden de inspección a cerrada y registra fecha/hora
   * 12. Sistema actualiza al sismógrafo como fuera de servicio
   * 13. Sistema envía notificación por email y a monitores CORS
   *
   * @param ordenId ID de la orden de inspección a cerrar
   * @param observacion Texto de la observación ingresada por el RI
   * @param motivosIds IDs de los motivos seleccionados para poner el sismógrafo fuera de servicio
   * @returns Información de la orden cerrada y mensaje de confirmación
   */
  async registrarCierreOrden(
    ordenId: number,
    observacion: string,
    motivosIds: number[],
  ): Promise<any> {
    this.logger.log(`Registrando cierre de la orden ${ordenId}`);

    // Paso 8: Sistema valida datos y registra cierre
    // Obtener la orden de inspección
    const orden = await this.ordenInspeccionRepository.findOne({
      where: { id: ordenId },
      relations: ["estacionSismologica", "sismografo", "responsable"],
    });

    if (!orden) {
      throw new Error("Orden de inspección no encontrada");
    }

    // Paso 8: Sistema valida datos y registra cierre (continuación)
    // Verificar que la orden esté en estado REALIZADA
    if (orden.estado !== EstadoOrdenInspeccion.REALIZADA) {
      throw new Error("La orden de inspección no está en estado REALIZADA");
    }

    // Paso 8: Sistema valida datos y registra cierre (continuación)
    // Obtener los motivos seleccionados
    const motivos = await this.motivoFueraServicioRepository.findByIds(motivosIds);

    if (motivos.length === 0) {
      throw new Error(
        "Debe seleccionar al menos un motivo para poner el sismógrafo fuera de servicio",
      );
    }

    // Paso 8: Sistema valida datos y registra cierre (continuación)
    // Crear la observación de cierre
    const observacionCierre = this.observacionCierreRepository.create({
      texto: observacion,
      ordenInspeccion: orden,
      motivos: motivos,
    });

    await this.observacionCierreRepository.save(observacionCierre);

    // Paso 9 y 12: Sistema actualiza estado del sismógrafo a fuera de servicio
    const sismografo = orden.sismografo;
    sismografo.estado = EstadoSismografo.FUERA_SERVICIO;
    sismografo.fechaUltimoCambioEstado = new Date();
    sismografo.motivosFueraServicio = motivos;

    await this.sismografoRepository.save(sismografo);

    // Paso 11: Sistema actualiza la orden de inspección a cerrada y registra la fecha y hora
    orden.estado = EstadoOrdenInspeccion.CERRADA;
    orden.fechaCierre = new Date();

    await this.ordenInspeccionRepository.save(orden);

    // Paso 10 y 13: Sistema envía notificaciones a responsables por email y a monitores CORS
    this.notificacionService.enviarNotificacionCierreOrden(orden, observacionCierre);

    return {
      ordenCerrada: this.mapearOrdenADTO(orden),
      mensaje: "Orden cerrada exitosamente",
    };
  }

  /**
   * Mapea una lista de entidades OrdenInspeccion a DTOs
   */
  private mapearOrdenesADTO(ordenes: OrdenInspeccion[]): any[] {
    return ordenes.map((orden) => this.mapearOrdenADTO(orden));
  }

  /**
   * Mapea una entidad OrdenInspeccion a DTO
   */
  private mapearOrdenADTO(orden: OrdenInspeccion): any {
    return {
      id: orden.id,
      fechaCreacion: orden.fechaCreacion,
      fechaFinalizacion: orden.fechaFinalizacion,
      estado: orden.estado,
      estacionSismologica: {
        id: orden.estacionSismologica.id,
        nombre: orden.estacionSismologica.nombre,
        ubicacion: orden.estacionSismologica.ubicacion,
      },
      sismografo: {
        id: orden.sismografo.id,
        identificador: orden.sismografo.identificador,
        estado: orden.sismografo.estado,
      },
      responsable: {
        id: orden.responsable.id,
        nombre: orden.responsable.nombre,
      },
      resultadoInspeccion: orden.resultadoInspeccion,
      fechaCierre: orden.fechaCierre,
    };
  }
}

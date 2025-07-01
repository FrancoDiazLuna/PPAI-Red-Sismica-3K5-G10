import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrdenInspeccion, EstadoOrdenInspeccion } from "../entities/orden-inspeccion.entity";
import { ObservacionCierre } from "../entities/observacion-cierre.entity";
import { MotivoFueraServicio } from "../../estaciones/entities/motivo-fuera-servicio.entity";
import { Sismografo, EstadoSismografo } from "../../estaciones/entities/sismografo.entity";
import { CustomLoggerService } from "../../../common/services/logger.service";
import { NotificacionService } from "./notificacion.service";

@Injectable()
export class GestorCierreOrdenService {
  private readonly logger = new CustomLoggerService("GestorCierreOrdenService");
  
  constructor(
    @InjectRepository(OrdenInspeccion)
    private ordenInspeccionRepository: Repository<OrdenInspeccion>,
    @InjectRepository(ObservacionCierre)
    private observacionCierreRepository: Repository<ObservacionCierre>,
    @InjectRepository(MotivoFueraServicio)
    private motivoFueraServicioRepository: Repository<MotivoFueraServicio>,
    @InjectRepository(Sismografo)
    private sismografoRepository: Repository<Sismografo>,
    private notificacionService: NotificacionService
  ) {}

  /**
   * Inicia el proceso de cierre de una orden de inspección
   */
  async iniciarCierreOrden(responsableId: number): Promise<any> {
    this.logger.log(`Iniciando proceso de cierre de órdenes para el responsable ${responsableId}`);
    
    // Buscar órdenes realizadas por el responsable
    const ordenesRealizadas = await this.buscarOrdenesRealizadasPorResponsable(responsableId);
    
    return {
      ordenesRealizadas: this.mapearOrdenesADTO(ordenesRealizadas)
    };
  }

  /**
   * Busca las órdenes en estado REALIZADA para un responsable específico
   */
  private async buscarOrdenesRealizadasPorResponsable(responsableId: number): Promise<OrdenInspeccion[]> {
    return await this.ordenInspeccionRepository.find({
      where: {
        responsable: { id: responsableId },
        estado: EstadoOrdenInspeccion.REALIZADA
      },
      relations: ["estacionSismologica", "sismografo", "responsable"],
      order: {
        fechaFinalizacion: "DESC"
      }
    });
  }

  /**
   * Obtiene los detalles de una orden de inspección específica
   */
  async obtenerDetalleOrden(ordenId: number): Promise<any> {
    this.logger.log(`Obteniendo detalle de la orden ${ordenId}`);
    
    const orden = await this.ordenInspeccionRepository.findOne({
      where: { id: ordenId },
      relations: ["estacionSismologica", "sismografo", "responsable"]
    });
    
    if (!orden) {
      throw new Error("Orden de inspección no encontrada");
    }
    
    // Obtener todos los motivos de fuera de servicio disponibles
    const motivosFueraServicio = await this.motivoFueraServicioRepository.find();
    
    return {
      orden: this.mapearOrdenADTO(orden),
      motivosFueraServicio: motivosFueraServicio.map(motivo => ({
        id: motivo.id,
        descripcion: motivo.descripcion,
        tipo: motivo.tipo
      }))
    };
  }

  /**
   * Registra el cierre de una orden de inspección
   */
  async registrarCierreOrden(ordenId: number, observacion: string, motivosIds: number[]): Promise<any> {
    this.logger.log(`Registrando cierre de la orden ${ordenId}`);
    
    // Obtener la orden de inspección
    const orden = await this.ordenInspeccionRepository.findOne({
      where: { id: ordenId },
      relations: ["estacionSismologica", "sismografo", "responsable"]
    });

    if (!orden) {
      throw new Error("Orden de inspección no encontrada");
    }

    // Verificar que la orden esté en estado REALIZADA
    if (orden.estado !== EstadoOrdenInspeccion.REALIZADA) {
      throw new Error("La orden de inspección no está en estado REALIZADA");
    }

    // Obtener los motivos seleccionados
    const motivos = await this.motivoFueraServicioRepository.findByIds(motivosIds);
    
    if (motivos.length === 0) {
      throw new Error("Debe seleccionar al menos un motivo para poner el sismógrafo fuera de servicio");
    }

    // Crear la observación de cierre
    const observacionCierre = this.observacionCierreRepository.create({
      texto: observacion,
      ordenInspeccion: orden,
      motivos: motivos
    });

    await this.observacionCierreRepository.save(observacionCierre);

    // Actualizar el estado del sismógrafo
    const sismografo = orden.sismografo;
    sismografo.estado = EstadoSismografo.FUERA_SERVICIO;
    sismografo.fechaUltimoCambioEstado = new Date();
    sismografo.motivosFueraServicio = motivos;
    
    await this.sismografoRepository.save(sismografo);

    // Actualizar la orden de inspección
    orden.estado = EstadoOrdenInspeccion.CERRADA;
    orden.fechaCierre = new Date();
    
    await this.ordenInspeccionRepository.save(orden);

    // Enviar notificación
    await this.notificacionService.enviarNotificacionCierreOrden(orden, observacionCierre);

    return {
      ordenCerrada: this.mapearOrdenADTO(orden),
      mensaje: "Orden cerrada exitosamente"
    };
  }

  /**
   * Mapea una lista de entidades OrdenInspeccion a DTOs
   */
  private mapearOrdenesADTO(ordenes: OrdenInspeccion[]): any[] {
    return ordenes.map(orden => this.mapearOrdenADTO(orden));
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
        ubicacion: orden.estacionSismologica.ubicacion
      },
      sismografo: {
        id: orden.sismografo.id,
        identificador: orden.sismografo.identificador,
        estado: orden.sismografo.estado
      },
      responsable: {
        id: orden.responsable.id,
        nombre: orden.responsable.nombre
      },
      resultadoInspeccion: orden.resultadoInspeccion,
      fechaCierre: orden.fechaCierre
    };
  }
}

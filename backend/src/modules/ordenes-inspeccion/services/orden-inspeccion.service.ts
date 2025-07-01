import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import {
  OrdenInspeccion,
  EstadoOrdenInspeccion,
} from "../entities/orden-inspeccion.entity";
import { ObservacionCierre } from "../../observaciones-cierre/entities/observacion-cierre.entity";
import { MotivoFueraServicio } from "../../motivos-fuera-servicio/entities/motivo-fuera-servicio.entity";
import {
  Sismografo,
  EstadoSismografo,
} from "../../sismografos/entities/sismografo.entity";
import { CustomLoggerService } from "../../../common/services/logger.service";
import { NotificacionService } from "../../notificaciones/services/notificacion.service";

@Injectable()
export class OrdenInspeccionService {
  private readonly logger = new CustomLoggerService("OrdenInspeccionService");

  constructor(
    @InjectRepository(OrdenInspeccion)
    private ordenInspeccionRepository: Repository<OrdenInspeccion>,
    @InjectRepository(ObservacionCierre)
    private observacionCierreRepository: Repository<ObservacionCierre>,
    @Inject(getRepositoryToken(MotivoFueraServicio))
    private motivoFueraServicioRepository: Repository<MotivoFueraServicio>,
    @Inject(getRepositoryToken(Sismografo))
    private sismografoRepository: Repository<Sismografo>,
    private notificacionService: NotificacionService
  ) {}

  async buscarOrdenesRealizadasPorResponsable(responsableId: number): Promise<OrdenInspeccion[]> {
    this.logger.log(`Buscando órdenes realizadas para el responsable ${responsableId}`);
    
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

  async obtenerOrdenPorId(id: number): Promise<OrdenInspeccion | null> {
    this.logger.log(`Obteniendo orden de inspección con ID ${id}`);
    
    return await this.ordenInspeccionRepository.findOne({
      where: { id },
      relations: ["estacionSismologica", "sismografo", "responsable"]
    });
  }

  async cerrarOrden(ordenId: number, observacion: string, motivosIds: number[]): Promise<OrdenInspeccion> {
    this.logger.log(`Cerrando orden de inspección ${ordenId}`);
    
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

    return orden;
  }
}

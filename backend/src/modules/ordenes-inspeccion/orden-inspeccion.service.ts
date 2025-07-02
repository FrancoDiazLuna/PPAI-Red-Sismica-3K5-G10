import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, EntityManager } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";

import { OrdenDeInspeccion } from "./entities/orden-inspeccion.entity";
import { MotivoFueraServicio } from "../motivos-fuera-servicio/entities/motivo-fuera-servicio.entity";
import { Sismografo } from "../sismografos/entities/sismografo.entity";
import { Estado } from "../estados/entities/estado.entity";
import { CustomLoggerService } from "../../common/services/logger.service";
import { NotificacionService } from "../notificaciones/notificacion.service";

@Injectable()
export class OrdenInspeccionService {
  private readonly logger = new CustomLoggerService("OrdenInspeccionService");

  constructor(
    @InjectRepository(OrdenDeInspeccion)
    private ordenInspeccionRepository: Repository<OrdenDeInspeccion>,
    @Inject(getRepositoryToken(MotivoFueraServicio))
    private motivoFueraServicioRepository: Repository<MotivoFueraServicio>,
    @Inject(getRepositoryToken(Sismografo))
    private sismografoRepository: Repository<Sismografo>,
    private notificacionService: NotificacionService,
    private entityManager: EntityManager,
  ) {}

  async buscarOrdenesRealizadasPorResponsable(responsableId: number): Promise<OrdenDeInspeccion[]> {
    this.logger.log(`Buscando órdenes realizadas para el responsable ${responsableId}`);

    return await this.ordenInspeccionRepository.find({
      where: {
        responsable: { id: responsableId },
        estado: { nombreEstado: "REALIZADA", ambito: "ORDEN_INSPECCION" },
      },
      relations: ["estacionSismologica", "responsable", "estado"],
      order: {
        fechaHoraFinalizacion: "DESC",
      },
    });
  }

  async obtenerOrdenPorId(id: number): Promise<OrdenDeInspeccion | null> {
    this.logger.log(`Obteniendo orden de inspección con ID ${id}`);

    return await this.ordenInspeccionRepository.findOne({
      where: { id },
      relations: ["estacionSismologica", "responsable", "estado"],
    });
  }

  async cerrarOrden(
    ordenId: number,
    observacion: string,
    motivosIds: number[],
  ): Promise<OrdenDeInspeccion> {
    this.logger.log(`Cerrando orden de inspección ${ordenId}`);

    // Obtener la orden de inspección
    const orden = await this.ordenInspeccionRepository.findOne({
      where: { id: ordenId },
      relations: ["estacionSismologica", "responsable", "estado"],
    });

    if (!orden) {
      throw new Error("Orden de inspección no encontrada");
    }

    // Verificar que la orden esté en estado REALIZADA
    if (orden.estado.nombreEstado !== "REALIZADA") {
      throw new Error("La orden de inspección no está en estado REALIZADA");
    }

    // Obtener los motivos seleccionados
    const motivos = await this.motivoFueraServicioRepository.findByIds(motivosIds);

    if (motivos.length === 0) {
      throw new Error(
        "Debe seleccionar al menos un motivo para poner el sismógrafo fuera de servicio",
      );
    }

    // Crear la observación de cierre
    orden.observacionCierre = observacion;

    await this.entityManager.save(orden);

    // Ya no actualizamos directamente el sismógrafo aquí
    // Necesitaríamos buscar el sismógrafo asociado a la estación primero

    // Buscar el estado CERRADA para órdenes de inspección
    const estadoCerrada = await this.entityManager.findOne(Estado, {
      where: { nombreEstado: "CERRADA", ambito: "ORDEN_INSPECCION" },
    });

    if (!estadoCerrada) {
      throw new Error("Estado CERRADA no encontrado para órdenes de inspección");
    }

    // Actualizar la orden de inspección
    orden.estado = estadoCerrada;
    orden.fechaHoraCierre = new Date();
    orden.observacionCierre = observacion;

    await this.ordenInspeccionRepository.save(orden);

    // Enviar notificación (método sincrónico, no necesita await)
    this.notificacionService.enviarNotificacionCierreOrden(orden);

    return orden;
  }
}

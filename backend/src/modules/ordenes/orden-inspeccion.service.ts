import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { OrdenInspeccion, EstadoOrdenInspeccion } from "./entities/orden-inspeccion.entity";
import { ObservacionCierre } from "./entities/observacion-cierre.entity";
import { MotivoFueraServicio } from "../estaciones/entities/motivo-fuera-servicio.entity";
import { Sismografo, EstadoSismografo } from "../estaciones/entities/sismografo.entity";
import { CustomLoggerService } from "../../common/services/logger.service";
import { NotificacionService } from "./notificacion.service";
import { OrdenInspeccionDto, ListaOrdenInspeccionDto } from "./dto/orden-inspeccion.dto";

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
    private notificacionService: NotificacionService,
  ) {}

  async buscarOrdenesRealizadasPorResponsable(responsableId: number): Promise<OrdenInspeccion[]> {
    this.logger.log(`Buscando órdenes realizadas para el responsable ${responsableId}`);

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

  async obtenerOrdenPorId(id: number): Promise<OrdenInspeccion | null> {
    this.logger.log(`Obteniendo orden de inspección con ID ${id}`);

    return await this.ordenInspeccionRepository.findOne({
      where: { id },
      relations: ["estacionSismologica", "sismografo", "responsable"],
    });
  }

  async obtenerOrdenesRealizadasPorResponsable(
    responsableId: number,
  ): Promise<ListaOrdenInspeccionDto> {
    const ordenes = await this.buscarOrdenesRealizadasPorResponsable(responsableId);

    return {
      ordenes: ordenes.map((orden) => ({
        id: orden.id,
        fechaCreacion: orden.fechaCreacion,
        fechaFinalizacion: orden.fechaFinalizacion,
        estado: orden.estado,
        estacionSismologicaId: orden.estacionSismologica.id,
        estacionSismologicaNombre: orden.estacionSismologica.nombre,
        sismografoId: orden.sismografo.id,
        sismografoIdentificador: orden.sismografo.identificador,
        responsableId: orden.responsable.id,
        responsableNombre: orden.responsable.nombre,
        resultadoInspeccion: orden.resultadoInspeccion,
      })),
    };
  }

  async obtenerDetalleOrden(ordenId: number): Promise<OrdenInspeccionDto> {
    const orden = await this.obtenerOrdenPorId(ordenId);

    if (!orden) {
      throw new Error("Orden de inspección no encontrada");
    }

    return {
      id: orden.id,
      fechaCreacion: orden.fechaCreacion,
      fechaFinalizacion: orden.fechaFinalizacion,
      estado: orden.estado,
      estacionSismologicaId: orden.estacionSismologica.id,
      estacionSismologicaNombre: orden.estacionSismologica.nombre,
      sismografoId: orden.sismografo.id,
      sismografoIdentificador: orden.sismografo.identificador,
      responsableId: orden.responsable.id,
      responsableNombre: orden.responsable.nombre,
      resultadoInspeccion: orden.resultadoInspeccion,
    };
  }

  async cerrarOrden(
    ordenId: number,
    observacion: string,
    motivosIds: number[],
  ): Promise<OrdenInspeccionDto> {
    this.logger.log(`Cerrando orden de inspección ${ordenId}`);

    // Obtener la orden de inspección
    const orden = await this.ordenInspeccionRepository.findOne({
      where: { id: ordenId },
      relations: ["estacionSismologica", "sismografo", "responsable"],
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
      throw new Error(
        "Debe seleccionar al menos un motivo para poner el sismógrafo fuera de servicio",
      );
    }

    // Crear la observación de cierre
    const observacionCierre = this.observacionCierreRepository.create({
      texto: observacion,
      ordenInspeccion: orden,
      motivos: motivos,
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

    // Enviar notificación (método sincrónico, no necesita await)
    this.notificacionService.enviarNotificacionCierreOrden(orden, observacionCierre);

    return this.obtenerDetalleOrden(ordenId);
  }
}

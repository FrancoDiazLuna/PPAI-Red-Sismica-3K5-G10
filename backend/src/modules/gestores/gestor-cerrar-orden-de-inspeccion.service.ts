import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Repository } from "typeorm";

import { OrdenDeInspeccion } from "../ordenes-inspeccion/entities/orden-inspeccion.entity";
import { MotivoFueraServicio } from "../motivos-fuera-servicio/entities/motivo-fuera-servicio.entity";
import { Sismografo } from "../sismografos/entities/sismografo.entity";
import { CambioEstado } from "../sismografos/entities/cambio-estado.entity";
import { CustomLoggerService } from "../../common/services/logger.service";
import { NotificacionService } from "../notificaciones/notificacion.service";
import { Sesion } from "../auth/entities/sesion.entity";
import { Usuario } from "../auth/entities/usuario.entity";
import { Estado } from "../estados/entities/estado.entity";
import { EstadosService } from "../estados/estados.service";

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
    @InjectRepository(OrdenDeInspeccion)
    private ordenInspeccionRepository: Repository<OrdenDeInspeccion>,
    @InjectRepository(MotivoFueraServicio)
    private motivoFueraServicioRepository: Repository<MotivoFueraServicio>,
    @InjectRepository(Sismografo)
    private sismografoRepository: Repository<Sismografo>,
    @InjectRepository(CambioEstado)
    private cambioEstadoRepository: Repository<CambioEstado>,
    @InjectRepository(Sesion)
    private sesionRepository: Repository<Sesion>,
    private notificacionService: NotificacionService,
    private estadoService: EstadosService,
  ) {}

  private sesionActiva: Sesion | null = null;
  private usuario: Usuario | null = null;
  private ordenSeleccionada: OrdenDeInspeccion | null = null;
  private observacionCierre: string | null = null;

  /**
   * Inicia el proceso de cierre de una orden de inspección
   *
   * Implementa los pasos 1-2 del caso de uso:
   * 1. RI selecciona "Cerrar Orden de Inspección"
   * 2. Sistema busca órdenes de inspección realizadas del RI
   *
   * @param sesionId ID de la sesion
   * @returns Lista de órdenes realizadas por el responsable
   */
  async tomarOpcCerrarOrdenInspeccion(sesionId: number): Promise<OrdenDeInspeccion[]> {
    this.logger.log(`Iniciando proceso de cierre de órdenes para el responsable ${sesionId}`);

    this.sesionActiva = await this.buscarSesion(sesionId);

    if (!this.sesionActiva) {
      throw new HttpException("Sesión no encontrada", HttpStatus.NOT_FOUND);
    }

    this.usuario = this.conocerUsuario(this.sesionActiva);

    const empleadoId = this.usuario?.empleado.id;

    if (!empleadoId) {
      throw new HttpException("Usuario no encontrado", HttpStatus.NOT_FOUND);
    }

    // Buscar órdenes en estado REALIZADA para el responsable
    const estadoRealizada = await this.estadoService.buscarEstadoPorNombreYAmbito(
      "REALIZADA",
      "ORDEN_INSPECCION",
    );

    if (!estadoRealizada) {
      throw new HttpException(
        "No se encontró el estado REALIZADA para órdenes de inspección",
        HttpStatus.NOT_FOUND,
      );
    }

    // Buscar órdenes realizadas por el responsable
    const ordenesRealizadas = await this.buscarOrdenesInspeccion(this.usuario.id, estadoRealizada);

    if (!ordenesRealizadas) {
      throw new HttpException("No se encontraron órdenes realizadas", HttpStatus.NOT_FOUND);
    }

    this.ordenarFechaFinalizacion(ordenesRealizadas);

    return ordenesRealizadas;
  }

  private async buscarSesion(sesionId: number): Promise<Sesion | null> {
    return await this.sesionRepository.findOne({
      where: { id: sesionId },
      relations: ["usuario"],
    });
  }

  private conocerUsuario(sesionActiva: Sesion): Usuario {
    return sesionActiva.usuario;
  }

  private ordenarFechaFinalizacion(ordenesRealizadas: OrdenDeInspeccion[]) {
    ordenesRealizadas.sort((a, b) => {
      // Usar fechaHoraFinalizacion que es el nombre correcto en la entidad
      const fechaA = a.fechaHoraFinalizacion ? a.fechaHoraFinalizacion.getTime() : 0;
      const fechaB = b.fechaHoraFinalizacion ? b.fechaHoraFinalizacion.getTime() : 0;
      return fechaB - fechaA;
    });
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
   *
   * @param responsableId ID del responsable de inspección
   * @returns Array de entidades OrdenInspeccion
   */
  private async buscarOrdenesInspeccion(
    responsableId: number,
    estado: Estado,
  ): Promise<OrdenDeInspeccion[]> {
    return await this.ordenInspeccionRepository.find({
      where: {
        responsable: { id: responsableId },
        estado: { nombreEstado: estado.nombreEstado, ambito: estado.ambito },
      },
      relations: ["estacionSismologica", "responsable", "estado"],
    });
  }

  /**
   * Obtiene una orden de inspección específica
   *
   * Implementa el paso 3 del caso de uso:
   * 3. RI selecciona una orden de inspección
   *
   * @param ordenId ID de la orden de inspección seleccionada
   * @returns Entidad OrdenInspeccion
   */
  async tomarOrdenInspeccion(ordenId: number) {
    this.ordenSeleccionada = await this.ordenInspeccionRepository.findOne({
      where: { id: ordenId },
      relations: ["estacionSismologica", "sismografo", "responsable"],
    });

    return this.ordenSeleccionada;
  }

  /**
   * Obtiene una observación de cierre de orden de inspección
   *
   * Implementa el paso 4 del caso de uso:
   * 4. RI ingresa observación de cierre
   *
   * @param observacion Observación de cierre
   */
  async tomarObservacionCierreOrdenInspeccion(observacion: string) {
    this.observacionCierre = observacion;

    return this.buscarMotivos();
  }

  /**
   * Obtiene los motivos de fuera de servicio disponibles
   *
   * Implementa el paso 4 del caso de uso:
   * 4. Sistema solicita seleccionar motivos para sismógrafo fuera de servicio
   *
   * @returns Array de entidades MotivoFueraServicio
   */
  async buscarMotivos() {
    // Buscar todos los motivos de fuera de servicio
    const motivos = await this.motivoFueraServicioRepository.find({
      relations: ["motivoTipo"],
    });

    return motivos.map((motivo) => ({
      id: motivo.id,
      comentario: motivo.comentario,
      motivoTipo: motivo.motivoTipo ? motivo.motivoTipo.descripcion : null,
    }));
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
        comentario: motivo.comentario,
        motivoTipo: motivo.motivoTipo.descripcion,
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
    if (orden.estado.nombreEstado !== "REALIZADA") {
      throw new Error("La orden de inspección no está en estado REALIZADA");
    }

    // Paso 8: Sistema valida datos y registra cierre (continuación)
    // Obtener los motivos seleccionados
    const motivos: MotivoFueraServicio[] = [];

    for (const motivoId of motivosIds) {
      const motivo = await this.motivoFueraServicioRepository.findOne({
        where: { id: motivoId },
        relations: ["motivoTipo"],
      });

      if (!motivo) {
        throw new Error(`No se encontró el motivo fuera de servicio con ID ${motivoId}`);
      }

      // Validar que el motivo sea de tipo "FUERA DE SERVICIO" (ahora usamos motivoTipo)
      if (motivo.motivoTipo && motivo.motivoTipo.descripcion !== "FUERA_SERVICIO") {
        throw new Error(`El motivo con ID ${motivoId} no es de tipo FUERA DE SERVICIO`);
      }

      motivos.push(motivo);
    }

    // Paso 8: Sistema registra observación de cierre en la orden
    orden.observacionCierre = observacion;

    // Paso 9: Sistema actualiza estado del sismógrafo a fuera de servicio
    // Buscar el sismógrafo asociado a la estación sismológica
    // En el nuevo modelo, el sismógrafo está asociado a la estación sismológica, no a la orden
    const sismografos = await this.sismografoRepository.find({
      where: { estacionSismologica: { id: orden.estacionSismologica.id } },
      relations: ["estacionSismologica"],
    });

    if (!sismografos || sismografos.length === 0) {
      throw new Error(
        `No se encontraron sismógrafos para la estación con ID ${orden.estacionSismologica.id}`,
      );
    }

    const sismografo = sismografos[0]; // Tomamos el primer sismógrafo encontrado

    // Actualizar estado del sismógrafo a fuera de servicio
    // Buscar el estado FUERA_SERVICIO para sismógrafos
    const estadoFueraServicio = await this.estadoService.buscarEstadoPorNombreYAmbito(
      "FUERA_SERVICIO",
      "SISMOGRAFO",
    );

    if (!estadoFueraServicio) {
      throw new Error("No se encontró el estado FUERA_SERVICIO para sismógrafos");
    }

    // Crear un nuevo cambio de estado para el sismógrafo
    const nuevoCambioEstado = new CambioEstado();
    nuevoCambioEstado.fechaHoraInicio = new Date();
    nuevoCambioEstado.estado = estadoFueraServicio;

    // Asociar los motivos seleccionados al cambio de estado
    if (motivos && motivos.length > 0) {
      nuevoCambioEstado.motivoFueraServicio = motivos[0]; // Asignamos el primer motivo (podría mejorarse para manejar múltiples motivos)
    }

    // Guardar el nuevo cambio de estado
    await this.cambioEstadoRepository.save(nuevoCambioEstado);

    // Actualizar el sismógrafo con el nuevo cambio de estado
    sismografo.cambioEstado = nuevoCambioEstado;
    await this.sismografoRepository.save(sismografo);

    // Paso 11: Sistema actualiza la orden de inspección a cerrada y registra la fecha y hora
    const estadoCerrada = await this.estadoService.buscarEstadoPorNombreYAmbito(
      "CERRADA",
      "ORDEN_INSPECCION",
    );

    if (!estadoCerrada) {
      throw new Error("No se encontró el estado CERRADA para órdenes de inspección");
    }

    orden.estado = estadoCerrada;
    orden.fechaHoraCierre = new Date();

    // Guardar la orden actualizada
    await this.ordenInspeccionRepository.save(orden);

    // Enviar notificación
    this.notificacionService.enviarNotificacionCierreOrden(orden);

    return {
      ordenCerrada: this.mapearOrdenADTO(orden),
      mensaje: "Orden de inspección cerrada exitosamente",
    };
  }

  /**
   * Mapea una entidad OrdenInspeccion a DTO
   */
  private mapearOrdenADTO(orden: OrdenDeInspeccion): any {
    return {
      id: orden.id,
      fechaHoraInicio: orden.fechaHoraInicio,
      fechaHoraFinalizacion: orden.fechaHoraFinalizacion,
      fechaHoraCierre: orden.fechaHoraCierre,
      nroOrden: orden.nroOrden,
      observacionCierre: orden.observacionCierre,
      estado: orden.estado ? orden.estado.nombreEstado : null,
      estacion: {
        id: orden.estacionSismologica ? orden.estacionSismologica.id : null,
        nombre: orden.estacionSismologica ? orden.estacionSismologica.nombre : null,
      },
      responsable: {
        id: orden.responsable ? orden.responsable.id : null,
        nombre: orden.responsable ? orden.responsable.nombre : null,
        email: orden.responsable ? orden.responsable.email : null,
      },
    };
  }
}

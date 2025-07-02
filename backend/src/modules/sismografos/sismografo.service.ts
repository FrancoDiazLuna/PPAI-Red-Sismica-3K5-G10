import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Sismografo } from "./entities/sismografo.entity";
import { CambioEstado } from "./entities/cambio-estado.entity";
import { MotivoFueraServicio } from "../motivos-fuera-servicio/entities/motivo-fuera-servicio.entity";
import { CustomLoggerService } from "../../common/services/logger.service";
import { Estado } from "../estados/entities/estado.entity";

@Injectable()
export class SismografoService {
  private readonly logger = new CustomLoggerService("SismografoService");

  constructor(
    @InjectRepository(Sismografo)
    private sismografoRepository: Repository<Sismografo>,
    @InjectRepository(CambioEstado)
    private cambioEstadoRepository: Repository<CambioEstado>,
    @InjectRepository(Estado)
    private estadoRepository: Repository<Estado>,
  ) {}

  async obtenerPorId(id: number): Promise<Sismografo | null> {
    try {
      this.logger.log(`Obteniendo sismógrafo con ID ${id}`);
      return await this.sismografoRepository.findOne({
        where: { id },
        relations: [
          "estacionSismologica",
          "cambioEstado",
          "cambioEstado.estado",
          "cambioEstado.motivoFueraServicio",
        ],
      });
    } catch (error: any) {
      this.logger.error(
        `Error al obtener sismógrafo con ID ${id}: ${error?.message || "Desconocido"}`,
      );
      return null;
    }
  }

  async obtenerSismografosFueraDeServicio(): Promise<Sismografo[]> {
    try {
      this.logger.log("Obteniendo sismógrafos fuera de servicio");

      // Buscar el estado FUERA_SERVICIO
      const estadoFueraServicio = await this.estadoRepository.findOne({
        where: {
          nombreEstado: "FUERA_SERVICIO",
          ambito: "SISMOGRAFO",
        },
      });

      if (!estadoFueraServicio) {
        throw new Error("No se encontró el estado FUERA_SERVICIO para sismógrafos");
      }

      // Buscar sismógrafos con cambio de estado asociado a FUERA_SERVICIO
      return await this.sismografoRepository.find({
        where: {
          cambioEstado: {
            estado: {
              id: estadoFueraServicio.id,
            },
          },
        },
        relations: [
          "estacionSismologica",
          "cambioEstado",
          "cambioEstado.estado",
          "cambioEstado.motivoFueraServicio",
        ],
      });
    } catch (error: any) {
      this.logger.error(
        `Error al obtener sismógrafos fuera de servicio: ${error?.message || "Desconocido"}`,
      );
      return [];
    }
  }

  async marcarFueraDeServicio(
    id: number,
    motivos: MotivoFueraServicio[],
  ): Promise<Sismografo | null> {
    try {
      this.logger.log(`Marcando sismógrafo ${id} como fuera de servicio`);

      const sismografo = await this.sismografoRepository.findOne({
        where: { id },
        relations: ["estacion", "motivosFueraServicio"],
      });

      if (!sismografo) {
        throw new Error(`Sismógrafo con ID ${id} no encontrado`);
      }

      // Buscar el estado FUERA_SERVICIO
      const estadoFueraServicio = await this.estadoRepository.findOne({
        where: {
          nombreEstado: "FUERA_SERVICIO",
          ambito: "SISMOGRAFO",
        },
      });

      if (!estadoFueraServicio) {
        throw new Error("No se encontró el estado FUERA_SERVICIO para sismógrafos");
      }

      // Crear un nuevo cambio de estado
      const nuevoCambioEstado = new CambioEstado();
      nuevoCambioEstado.fechaHoraInicio = new Date();
      nuevoCambioEstado.estado = estadoFueraServicio;

      // Asociar el primer motivo al cambio de estado (podría mejorarse para manejar múltiples motivos)
      if (motivos && motivos.length > 0) {
        nuevoCambioEstado.motivoFueraServicio = motivos[0];
      }

      // Guardar el nuevo cambio de estado
      await this.cambioEstadoRepository.save(nuevoCambioEstado);

      // Actualizar el sismógrafo con el nuevo cambio de estado
      sismografo.cambioEstado = nuevoCambioEstado;

      return await this.sismografoRepository.save(sismografo);
    } catch (error: any) {
      this.logger.error(
        `Error al marcar sismógrafo ${id} como fuera de servicio: ${error?.message || "Desconocido"}`,
      );
      return null;
    }
  }

  async marcarEnServicio(id: number): Promise<Sismografo | null> {
    try {
      this.logger.log(`Marcando sismógrafo ${id} como en servicio`);

      const sismografo = await this.sismografoRepository.findOne({
        where: { id },
        relations: ["estacion", "motivosFueraServicio"],
      });

      if (!sismografo) {
        throw new Error(`Sismógrafo con ID ${id} no encontrado`);
      }

      // Buscar el estado EN_SERVICIO
      const estadoEnServicio = await this.estadoRepository.findOne({
        where: {
          nombreEstado: "EN_SERVICIO",
          ambito: "SISMOGRAFO",
        },
      });

      if (!estadoEnServicio) {
        throw new Error("No se encontró el estado EN_SERVICIO para sismógrafos");
      }

      // Crear un nuevo cambio de estado
      const nuevoCambioEstado = new CambioEstado();
      nuevoCambioEstado.fechaHoraInicio = new Date();
      nuevoCambioEstado.estado = estadoEnServicio;

      // Guardar el nuevo cambio de estado
      await this.cambioEstadoRepository.save(nuevoCambioEstado);

      // Actualizar el sismógrafo con el nuevo cambio de estado
      sismografo.cambioEstado = nuevoCambioEstado;

      return await this.sismografoRepository.save(sismografo);
    } catch (error: any) {
      this.logger.error(
        `Error al marcar sismógrafo ${id} como en servicio: ${error?.message || "Desconocido"}`,
      );
      return null;
    }
  }

  async obtenerTodos(): Promise<Sismografo[]> {
    try {
      this.logger.log("Obteniendo todos los sismógrafos");
      return await this.sismografoRepository.find({
        relations: ["estacion", "motivosFueraServicio"],
      });
    } catch (error: any) {
      this.logger.error(`Error al obtener sismógrafos: ${error?.message || "Desconocido"}`);
      return [];
    }
  }
}

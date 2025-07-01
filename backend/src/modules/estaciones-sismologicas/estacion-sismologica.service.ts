import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EstacionSismologica } from "./entities/estacion-sismologica.entity";
import { CustomLoggerService } from "../../common/services/logger.service";

@Injectable()
export class EstacionSismologicaService {
  private readonly logger = new CustomLoggerService("EstacionSismologicaService");

  constructor(
    @InjectRepository(EstacionSismologica)
    private estacionRepository: Repository<EstacionSismologica>,
  ) {}

  async obtenerPorId(id: number): Promise<EstacionSismologica | null> {
    try {
      this.logger.log(`Obteniendo estación sismológica con ID ${id}`);
      return await this.estacionRepository.findOne({
        where: { id },
        relations: ["sismografos"],
      });
    } catch (error: any) {
      this.logger.error(
        `Error al obtener estación con ID ${id}: ${error?.message || "Desconocido"}`,
      );
      return null;
    }
  }

  async obtenerTodas(): Promise<EstacionSismologica[]> {
    try {
      this.logger.log("Obteniendo todas las estaciones sismológicas");
      return await this.estacionRepository.find({
        relations: ["sismografos"],
      });
    } catch (error: any) {
      this.logger.error(`Error al obtener estaciones: ${error?.message || "Desconocido"}`);
      return [];
    }
  }

  async obtenerEstaciónConSismografos(id: number): Promise<EstacionSismologica | null> {
    try {
      this.logger.log(`Obteniendo estación sismológica ${id} con sus sismógrafos`);
      return await this.estacionRepository.findOne({
        where: { id },
        relations: ["sismografos"],
      });
    } catch (error: any) {
      this.logger.error(
        `Error al obtener estación ${id} con sismógrafos: ${error?.message || "Desconocido"}`,
      );
      return null;
    }
  }
}

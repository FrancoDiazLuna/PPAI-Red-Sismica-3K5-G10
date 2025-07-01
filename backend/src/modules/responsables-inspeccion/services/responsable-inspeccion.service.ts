import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ResponsableInspeccion } from "../entities/responsable-inspeccion.entity";
import { CustomLoggerService } from "../../../common/services/logger.service";

@Injectable()
export class ResponsableInspeccionService {
  private readonly logger = new CustomLoggerService("ResponsableInspeccionService");

  constructor(
    @InjectRepository(ResponsableInspeccion)
    private responsableRepository: Repository<ResponsableInspeccion>,
  ) {}

  async obtenerPorId(id: number): Promise<ResponsableInspeccion | null> {
    try {
      this.logger.log(`Obteniendo responsable de inspección con ID ${id}`);
      return await this.responsableRepository.findOne({
        where: { id },
        relations: ["ordenesInspeccion"],
      });
    } catch (error: any) {
      this.logger.error(
        `Error al obtener responsable con ID ${id}: ${error?.message || 'Desconocido'}`,
      );
      return null;
    }
  }

  async obtenerPorUsuario(usuario: string): Promise<ResponsableInspeccion | null> {
    try {
      this.logger.log(`Obteniendo responsable de inspección con usuario ${usuario}`);
      return await this.responsableRepository.findOne({
        where: { usuario },
      });
    } catch (error: any) {
      this.logger.error(
        `Error al obtener responsable con usuario ${usuario}: ${error?.message || 'Desconocido'}`,
      );
      return null;
    }
  }

  async obtenerTodos(): Promise<ResponsableInspeccion[]> {
    try {
      this.logger.log("Obteniendo todos los responsables de inspección");
      return await this.responsableRepository.find();
    } catch (error: any) {
      this.logger.error(`Error al obtener responsables: ${error?.message || 'Desconocido'}`);
      return [];
    }
  }
}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MotivoFueraServicio } from "../entities/motivo-fuera-servicio.entity";
import { CustomLoggerService } from "../../../common/services/logger.service";

@Injectable()
export class MotivoFueraServicioService {
  private readonly logger = new CustomLoggerService(
    "MotivoFueraServicioService",
  );

  constructor(
    @InjectRepository(MotivoFueraServicio)
    private motivoFueraServicioRepository: Repository<MotivoFueraServicio>,
  ) {}

  async obtenerTodos(): Promise<MotivoFueraServicio[]> {
    try {
      this.logger.log("Obteniendo todos los motivos de fuera de servicio");
      return await this.motivoFueraServicioRepository.find();
    } catch (error: any) {
      this.logger.error(`Error al obtener motivos: ${error?.message || 'Desconocido'}`);
      return [];
    }
  }

  async obtenerPorId(id: number): Promise<MotivoFueraServicio | null> {
    try {
      this.logger.log(`Obteniendo motivo de fuera de servicio con ID ${id}`);
      return await this.motivoFueraServicioRepository.findOne({
        where: { id },
      });
    } catch (error: any) {
      this.logger.error(
        `Error al obtener motivo con ID ${id}: ${error?.message || 'Desconocido'}`,
      );
      return null;
    }
  }
}

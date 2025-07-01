import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Sismografo, EstadoSismografo } from "../entities/sismografo.entity";
import { MotivoFueraServicio } from "../../motivos-fuera-servicio/entities/motivo-fuera-servicio.entity";
import { CustomLoggerService } from "../../../common/services/logger.service";

@Injectable()
export class SismografoService {
  private readonly logger = new CustomLoggerService("SismografoService");

  constructor(
    @InjectRepository(Sismografo)
    private sismografoRepository: Repository<Sismografo>,
  ) {}

  async obtenerPorId(id: number): Promise<Sismografo | null> {
    try {
      this.logger.log(`Obteniendo sismógrafo con ID ${id}`);
      return await this.sismografoRepository.findOne({
        where: { id },
        relations: ["estacion", "motivosFueraServicio"],
      });
    } catch (error: any) {
      this.logger.error(
        `Error al obtener sismógrafo con ID ${id}: ${error?.message || 'Desconocido'}`,
      );
      return null;
    }
  }

  async marcarFueraDeServicio(
    id: number, 
    motivos: MotivoFueraServicio[]
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
      
      sismografo.estado = EstadoSismografo.FUERA_SERVICIO;
      sismografo.fechaUltimoCambioEstado = new Date();
      sismografo.motivosFueraServicio = motivos;
      
      return await this.sismografoRepository.save(sismografo);
    } catch (error: any) {
      this.logger.error(
        `Error al marcar sismógrafo ${id} como fuera de servicio: ${error?.message || 'Desconocido'}`,
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
      
      sismografo.estado = EstadoSismografo.EN_SERVICIO;
      sismografo.fechaUltimoCambioEstado = new Date();
      sismografo.motivosFueraServicio = [];
      
      return await this.sismografoRepository.save(sismografo);
    } catch (error: any) {
      this.logger.error(
        `Error al marcar sismógrafo ${id} como en servicio: ${error?.message || 'Desconocido'}`,
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
      this.logger.error(`Error al obtener sismógrafos: ${error?.message || 'Desconocido'}`);
      return [];
    }
  }
}

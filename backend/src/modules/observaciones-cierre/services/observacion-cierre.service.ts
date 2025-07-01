import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ObservacionCierre } from "../entities/observacion-cierre.entity";
import { OrdenInspeccion } from "../../ordenes-inspeccion/entities/orden-inspeccion.entity";
import { MotivoFueraServicio } from "../../motivos-fuera-servicio/entities/motivo-fuera-servicio.entity";
import { CustomLoggerService } from "../../../common/services/logger.service";

@Injectable()
export class ObservacionCierreService {
  private readonly logger = new CustomLoggerService("ObservacionCierreService");

  constructor(
    @InjectRepository(ObservacionCierre)
    private observacionCierreRepository: Repository<ObservacionCierre>,
  ) {}

  async crearObservacionCierre(
    texto: string,
    orden: OrdenInspeccion,
    motivos: MotivoFueraServicio[]
  ): Promise<ObservacionCierre> {
    try {
      this.logger.log(`Creando observación de cierre para orden ${orden.id}`);
      
      const observacion = this.observacionCierreRepository.create({
        texto,
        ordenInspeccion: orden,
        motivos
      });
      
      return await this.observacionCierreRepository.save(observacion);
    } catch (error: any) {
      this.logger.error(
        `Error al crear observación de cierre: ${error?.message || 'Desconocido'}`,
      );
      throw error;
    }
  }

  async obtenerPorId(id: number): Promise<ObservacionCierre | null> {
    try {
      this.logger.log(`Obteniendo observación de cierre con ID ${id}`);
      return await this.observacionCierreRepository.findOne({
        where: { id },
        relations: ["ordenInspeccion", "motivos"],
      });
    } catch (error: any) {
      this.logger.error(
        `Error al obtener observación con ID ${id}: ${error?.message || 'Desconocido'}`,
      );
      return null;
    }
  }

  async obtenerPorOrdenInspeccion(ordenId: number): Promise<ObservacionCierre[]> {
    try {
      this.logger.log(`Obteniendo observaciones de cierre para orden ${ordenId}`);
      return await this.observacionCierreRepository.find({
        where: { ordenInspeccion: { id: ordenId } },
        relations: ["motivos"],
      });
    } catch (error: any) {
      this.logger.error(
        `Error al obtener observaciones para orden ${ordenId}: ${error?.message || 'Desconocido'}`,
      );
      return [];
    }
  }
}

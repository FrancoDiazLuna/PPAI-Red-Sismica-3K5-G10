import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Estado } from "./entities/estado.entity";

@Injectable()
export class EstadosService {
  constructor(
    @InjectRepository(Estado)
    private estadoRepository: Repository<Estado>,
  ) {}

  async esRealizada(): Promise<Estado[]> {
    return await this.estadoRepository.find({ where: { nombreEstado: "realizada" } });
  }

  async esAmbitoOrdenInspeccion(): Promise<Estado[]> {
    return await this.estadoRepository.find({ where: { ambito: "ORDEN_INSPECCION" } });
  }

  async buscarEstadoPorNombreYAmbito(nombreEstado: string, ambito: string): Promise<Estado | null> {
    return await this.estadoRepository.findOne({
      where: { nombreEstado, ambito },
    });
  }
}

import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { MotivoFueraServicioService } from "../services/motivo-fuera-servicio.service";
import { ListaMotivosFueraServicioDto } from "../dto/motivo-fuera-servicio.dto";
import { CustomLoggerService } from "../../../common/services/logger.service";

@ApiTags("motivos-fuera-servicio")
@Controller({ path: "motivos-fuera-servicio", version: "1" })
export class MotivoFueraServicioController {
  private readonly logger = new CustomLoggerService("MotivoFueraServicioController");

  constructor(private readonly motivoFueraServicioService: MotivoFueraServicioService) {
    this.logger.log("Inicializando controlador de motivos fuera de servicio");
  }

  @Get()
  @ApiOperation({ summary: "Obtener todos los motivos de fuera de servicio" })
  @ApiResponse({ status: 200, description: "Lista de motivos", type: ListaMotivosFueraServicioDto })
  async obtenerTodos(): Promise<ListaMotivosFueraServicioDto> {
    try {
      this.logger.log("Obteniendo todos los motivos de fuera de servicio");
      
      const motivos = await this.motivoFueraServicioService.obtenerTodos();
      
      return {
        motivos: motivos.map(motivo => ({
          id: motivo.id,
          descripcion: motivo.descripcion,
          tipo: motivo.tipo
        }))
      };
    } catch (error) {
      this.logger.error(`Error al obtener motivos: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

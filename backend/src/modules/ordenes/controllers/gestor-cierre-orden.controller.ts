import { Controller, Get, Post, Body, Param, UseGuards, HttpException, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { GestorCierreOrdenService } from "../services/gestor-cierre-orden.service";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { CustomLoggerService } from "../../../common/services/logger.service";

@ApiTags("gestor-cierre-orden")
@Controller({ path: "gestor-cierre-orden", version: "1" })
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GestorCierreOrdenController {
  private readonly logger = new CustomLoggerService("GestorCierreOrdenController");

  constructor(private readonly gestorCierreOrdenService: GestorCierreOrdenService) {
    this.logger.log("Inicializando controlador del gestor de cierre de órdenes");
  }

  @Get("iniciar/:responsableId")
  @ApiOperation({ summary: "Iniciar el proceso de cierre de órdenes para un responsable" })
  @ApiResponse({ status: 200, description: "Proceso iniciado con éxito" })
  async iniciarCierreOrden(@Param("responsableId") responsableId: number) {
    try {
      this.logger.log(`Iniciando proceso de cierre para el responsable ${responsableId}`);
      return await this.gestorCierreOrdenService.iniciarCierreOrden(responsableId);
    } catch (error) {
      this.logger.error(`Error al iniciar proceso de cierre: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("detalle-orden/:ordenId")
  @ApiOperation({ summary: "Obtener detalle de una orden para su cierre" })
  @ApiResponse({ status: 200, description: "Detalle de la orden y motivos disponibles" })
  async obtenerDetalleOrden(@Param("ordenId") ordenId: number) {
    try {
      this.logger.log(`Obteniendo detalle para la orden ${ordenId}`);
      return await this.gestorCierreOrdenService.obtenerDetalleOrden(ordenId);
    } catch (error) {
      this.logger.error(`Error al obtener detalle de orden: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("registrar-cierre")
  @ApiOperation({ summary: "Registrar el cierre de una orden de inspección" })
  @ApiResponse({ status: 200, description: "Orden cerrada exitosamente" })
  async registrarCierreOrden(
    @Body() cierreData: { ordenId: number; observacion: string; motivosIds: number[] }
  ) {
    try {
      this.logger.log(`Registrando cierre para la orden ${cierreData.ordenId}`);
      return await this.gestorCierreOrdenService.registrarCierreOrden(
        cierreData.ordenId,
        cierreData.observacion,
        cierreData.motivosIds
      );
    } catch (error) {
      this.logger.error(`Error al registrar cierre de orden: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

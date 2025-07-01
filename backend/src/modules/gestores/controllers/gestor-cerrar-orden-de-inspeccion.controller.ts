import { Controller, Get, Post, Body, Param, UseGuards, HttpException, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { GestorCerrarOrdenDeInspeccionService } from "../services/gestor-cerrar-orden-de-inspeccion.service";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { CustomLoggerService } from "../../../common/services/logger.service";

@ApiTags("gestor-cerrar-orden-de-inspeccion")
@Controller({ path: "gestor-cerrar-orden-de-inspeccion", version: "1" })
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GestorCerrarOrdenDeInspeccionController {
  private readonly logger = new CustomLoggerService("GestorCerrarOrdenDeInspeccionController");

  constructor(private readonly gestorService: GestorCerrarOrdenDeInspeccionService) {
    this.logger.log("Inicializando controlador del gestor de cierre de órdenes");
  }

  @Get("iniciar/:responsableId")
  @ApiOperation({ summary: "Iniciar el proceso de cierre de órdenes para un responsable" })
  @ApiResponse({ status: 200, description: "Proceso iniciado con éxito" })
  async iniciarCierreOrden(@Param("responsableId") responsableId: number) {
    try {
      this.logger.log(`Iniciando proceso de cierre para el responsable ${responsableId}`);
      return await this.gestorService.iniciarCierreOrden(responsableId);
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
      return await this.gestorService.obtenerDetalleOrden(ordenId);
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
      return await this.gestorService.registrarCierreOrden(
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

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";

import { GestorCerrarOrdenDeInspeccionService } from "./gestor-cerrar-orden-de-inspeccion.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CustomLoggerService } from "../../common/services/logger.service";
import { getErrorMessage } from "../../common/utils/error-handling.util";

/**
 * Controlador para el caso de uso "Dar cierre a orden de inspección de ES"
 *
 * Este controlador implementa los endpoints necesarios para el flujo del caso de uso:
 * 1. RI selecciona "Cerrar Orden de Inspección" -> iniciarCierreOrden
 * 2. Sistema busca órdenes realizadas por el responsable -> iniciarCierreOrden
 * 3. RI selecciona una orden -> Frontend
 * 4-5. Sistema permite ingresar observación y seleccionar motivos -> obtenerDetalleOrden
 * 6-7. RI ingresa datos y confirma -> Frontend
 * 8-13. Sistema procesa el cierre -> registrarCierreOrden
 */

@ApiTags("gestor-cerrar-orden-de-inspeccion")
@Controller({ path: "gestor-cerrar-orden-de-inspeccion", version: "1" })
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GestorCerrarOrdenDeInspeccionController {
  private readonly logger = new CustomLoggerService("GestorCerrarOrdenDeInspeccionController");

  constructor(private readonly gestorService: GestorCerrarOrdenDeInspeccionService) {
    this.logger.log("Inicializando controlador del gestor de cierre de órdenes");
  }

  /**
   * Paso 1-2: RI selecciona "Cerrar Orden de Inspección" y el sistema busca órdenes realizadas
   *
   * Este endpoint se invoca cuando el RI inicia el proceso de cierre de órdenes.
   * El sistema busca todas las órdenes en estado REALIZADA asociadas al responsable
   * y las devuelve para que el RI pueda seleccionar una.
   */
  @Get("tomarOpcCerrarOrdenInspeccion/:sesionId")
  @ApiOperation({ summary: "Iniciar el proceso de cierre de órdenes para un responsable" })
  @ApiResponse({ status: 200, description: "Proceso iniciado con éxito" })
  async tomarOpcCerrarOrdenInspeccion(@Param("sesionId") sesionId: number) {
    try {
      this.logger.log(`Iniciando proceso de cierre para el responsable ${sesionId}`);
      return await this.gestorService.tomarOpcCerrarOrdenInspeccion(sesionId);
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      this.logger.error(`Error al iniciar proceso de cierre: ${errorMessage}`);
      throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Pasos 3-5: RI selecciona una orden y el sistema muestra detalles y motivos
   *
   * Este endpoint se invoca cuando el RI selecciona una orden específica para cerrar.
   * El sistema devuelve los detalles de la orden seleccionada y la lista de posibles
   * motivos para marcar el sismógrafo como fuera de servicio.
   */
  @Post("tomarOrdenInspeccion")
  @ApiOperation({ summary: "Tomar orden de inspección para su cierre" })
  @ApiResponse({ status: 200, description: "Detalle de la orden y motivos disponibles" })
  async tomarOrdenInspeccion(@Body() ordenId: number) {
    try {
      this.logger.log(`Obteniendo la orden ${ordenId} seleccionada`);
      return await this.gestorService.tomarOrdenInspeccion(ordenId);
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      this.logger.error(`Error al obtener la orden ${ordenId}: ${errorMessage}`);
      throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("tomarObservacionCierreOrdenInspeccion")
  @ApiOperation({ summary: "Tomar observación de cierre de orden de inspección" })
  @ApiResponse({ status: 200, description: "Observación de cierre de orden de inspección" })
  async tomarObservacionCierreOrdenInspeccion(@Body() observacion: string) {
    try {
      this.logger.log("Buscando motivos para cerrar orden de inspección");
      return await this.gestorService.tomarObservacionCierreOrdenInspeccion(observacion);
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      this.logger.error(`Error al buscar motivos: ${errorMessage}`);
      throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Pasos 6-13: RI confirma cierre y el sistema procesa la operación
   *
   * Este endpoint se invoca cuando el RI ha seleccionado los motivos, ingresado
   * la observación y confirma el cierre de la orden. El sistema entonces:
   * - Valida los datos ingresados (paso 8)
   * - Actualiza el estado del sismógrafo a fuera de servicio (paso 9)
   * - Actualiza el estado de la orden a cerrada (paso 11)
   * - Registra la fecha y hora del cierre (paso 11)
   * - Envía notificaciones a los responsables (pasos 10 y 13)
   */
  @Post("registrar-cierre")
  @ApiOperation({ summary: "Registrar el cierre de una orden de inspección" })
  @ApiResponse({ status: 200, description: "Orden cerrada exitosamente" })
  async registrarCierreOrden(
    @Body() cierreData: { ordenId: number; observacion: string; motivosIds: number[] },
  ) {
    try {
      this.logger.log(`Registrando cierre para la orden ${cierreData.ordenId}`);
      return await this.gestorService.registrarCierreOrden(
        cierreData.ordenId,
        cierreData.observacion,
        cierreData.motivosIds,
      );
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      this.logger.error(`Error al registrar cierre de orden: ${errorMessage}`);
      throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

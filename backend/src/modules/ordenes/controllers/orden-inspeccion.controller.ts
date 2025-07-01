import { Controller, Get, Post, Body, Param, UseGuards, HttpException, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { OrdenInspeccionService } from "../services/orden-inspeccion.service";
import { OrdenInspeccionDto, ListaOrdenInspeccionDto } from "../dto/orden-inspeccion.dto";
import { CierreOrdenDto } from "../dto/cierre-orden.dto";
import { CustomLoggerService } from "../../../common/services/logger.service";

@ApiTags("ordenes-inspeccion")
@Controller({ path: "ordenes-inspeccion", version: "1" })
export class OrdenInspeccionController {
  private readonly logger = new CustomLoggerService("OrdenInspeccionController");

  constructor(private readonly ordenInspeccionService: OrdenInspeccionService) {
    this.logger.log("Inicializando controlador de órdenes de inspección");
  }

  @Get("responsable/:responsableId/realizadas")
  @ApiOperation({ summary: "Obtener órdenes de inspección realizadas por responsable" })
  @ApiResponse({ status: 200, description: "Lista de órdenes de inspección", type: ListaOrdenInspeccionDto })
  async obtenerOrdenesRealizadasPorResponsable(@Param("responsableId") responsableId: number): Promise<ListaOrdenInspeccionDto> {
    try {
      this.logger.log(`Obteniendo órdenes realizadas para el responsable ${responsableId}`);
      
      const ordenes = await this.ordenInspeccionService.buscarOrdenesRealizadasPorResponsable(responsableId);
      
      // Mapear las entidades a DTOs
      const ordenesDto = ordenes.map(orden => {
        return {
          id: orden.id,
          fechaCreacion: orden.fechaCreacion,
          fechaFinalizacion: orden.fechaFinalizacion,
          estado: orden.estado,
          estacionSismologicaId: orden.estacionSismologica.id,
          estacionSismologicaNombre: orden.estacionSismologica.nombre,
          sismografoId: orden.sismografo.id,
          sismografoIdentificador: orden.sismografo.identificador,
          responsableId: orden.responsable.id,
          responsableNombre: orden.responsable.nombre,
          resultadoInspeccion: orden.resultadoInspeccion
        } as OrdenInspeccionDto;
      });

      return { ordenes: ordenesDto };
    } catch (error) {
      this.logger.error(`Error al obtener órdenes: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "Obtener una orden de inspección por ID" })
  @ApiResponse({ status: 200, description: "Orden de inspección", type: OrdenInspeccionDto })
  async obtenerOrdenPorId(@Param("id") id: number): Promise<OrdenInspeccionDto> {
    try {
      this.logger.log(`Obteniendo orden de inspección con ID ${id}`);
      
      const orden = await this.ordenInspeccionService.obtenerOrdenPorId(id);
      
      if (!orden) {
        throw new HttpException("Orden de inspección no encontrada", HttpStatus.NOT_FOUND);
      }

      // Mapear la entidad a DTO
      return {
        id: orden.id,
        fechaCreacion: orden.fechaCreacion,
        fechaFinalizacion: orden.fechaFinalizacion,
        estado: orden.estado,
        estacionSismologicaId: orden.estacionSismologica.id,
        estacionSismologicaNombre: orden.estacionSismologica.nombre,
        sismografoId: orden.sismografo.id,
        sismografoIdentificador: orden.sismografo.identificador,
        responsableId: orden.responsable.id,
        responsableNombre: orden.responsable.nombre,
        resultadoInspeccion: orden.resultadoInspeccion
      } as OrdenInspeccionDto;
    } catch (error) {
      this.logger.error(`Error al obtener orden: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("cerrar")
  @ApiOperation({ summary: "Cerrar una orden de inspección" })
  @ApiResponse({ status: 200, description: "Orden de inspección cerrada", type: OrdenInspeccionDto })
  async cerrarOrden(@Body() cierreOrdenDto: CierreOrdenDto): Promise<OrdenInspeccionDto> {
    try {
      this.logger.log(`Cerrando orden de inspección ${cierreOrdenDto.ordenInspeccionId}`);
      
      const orden = await this.ordenInspeccionService.cerrarOrden(cierreOrdenDto);
      
      // Mapear la entidad a DTO
      return {
        id: orden.id,
        fechaCreacion: orden.fechaCreacion,
        fechaFinalizacion: orden.fechaFinalizacion,
        estado: orden.estado,
        estacionSismologicaId: orden.estacionSismologica.id,
        estacionSismologicaNombre: orden.estacionSismologica.nombre,
        sismografoId: orden.sismografo.id,
        sismografoIdentificador: orden.sismografo.identificador,
        responsableId: orden.responsable.id,
        responsableNombre: orden.responsable.nombre,
        resultadoInspeccion: orden.resultadoInspeccion
      } as OrdenInspeccionDto;
    } catch (error) {
      this.logger.error(`Error al cerrar orden: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsArray, IsOptional } from "class-validator";

export class IniciarCierreOrdenDto {
  @ApiProperty({ description: "ID del responsable de inspección" })
  @IsNumber()
  @IsNotEmpty()
  responsableId: number;
}

export class DetalleOrdenDto {
  @ApiProperty({ description: "ID de la orden de inspección" })
  @IsNumber()
  @IsNotEmpty()
  ordenId: number;
}

export class RegistrarCierreOrdenDto {
  @ApiProperty({ description: "ID de la orden de inspección" })
  @IsNumber()
  @IsNotEmpty()
  ordenId: number;

  @ApiProperty({ description: "Observación del cierre" })
  @IsString()
  @IsNotEmpty()
  observacion: string;

  @ApiProperty({ description: "IDs de los motivos de fuera de servicio seleccionados" })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  motivosIds: number[];
}

export class OrdenInspeccionDetalleDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fechaCreacion: Date;

  @ApiProperty()
  fechaFinalizacion: Date;

  @ApiProperty()
  estado: string;

  @ApiProperty()
  estacionSismologica: {
    id: number;
    nombre: string;
    ubicacion: string;
  };

  @ApiProperty()
  sismografo: {
    id: number;
    identificador: string;
    estado: string;
  };

  @ApiProperty()
  responsable: {
    id: number;
    nombre: string;
  };

  @ApiProperty()
  resultadoInspeccion: string;

  @ApiProperty()
  fechaCierre?: Date;
}

export class MotivoFueraServicioDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  tipo: string;
}

export class DetalleOrdenResponseDto {
  @ApiProperty()
  orden: OrdenInspeccionDetalleDto;

  @ApiProperty({ type: [MotivoFueraServicioDto] })
  motivosFueraServicio: MotivoFueraServicioDto[];
}

export class IniciarCierreOrdenResponseDto {
  @ApiProperty({ type: [OrdenInspeccionDetalleDto] })
  ordenesRealizadas: OrdenInspeccionDetalleDto[];
}

export class RegistrarCierreOrdenResponseDto {
  @ApiProperty()
  ordenCerrada: OrdenInspeccionDetalleDto;

  @ApiProperty()
  mensaje: string;
}

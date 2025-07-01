import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, IsDate, IsArray } from "class-validator";
import { EstadoOrdenInspeccion } from "../entities/orden-inspeccion.entity";
import { Type } from "class-transformer";

export class OrdenInspeccionDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  fechaCreacion: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fechaFinalizacion?: Date;

  @ApiProperty({ enum: EstadoOrdenInspeccion })
  @IsEnum(EstadoOrdenInspeccion)
  estado: EstadoOrdenInspeccion;

  @ApiProperty()
  @IsNumber()
  estacionSismologicaId: number;

  @ApiProperty()
  @IsString()
  estacionSismologicaNombre: string;

  @ApiProperty()
  @IsNumber()
  sismografoId: number;

  @ApiProperty()
  @IsString()
  sismografoIdentificador: string;

  @ApiProperty()
  @IsNumber()
  responsableId: number;

  @ApiProperty()
  @IsString()
  responsableNombre: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  resultadoInspeccion?: string;
}

export class ListaOrdenInspeccionDto {
  @ApiProperty({ type: [OrdenInspeccionDto] })
  @IsArray()
  ordenes: OrdenInspeccionDto[];
}

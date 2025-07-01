import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate, IsEnum, IsOptional } from 'class-validator';
import { EstadoOrdenInspeccion } from '../entities/orden-inspeccion.entity';
import { Type } from 'class-transformer';

export class OrdenInspeccionDto {
  @ApiProperty({ description: 'ID de la orden de inspección' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Fecha de creación de la orden' })
  @IsDate()
  @Type(() => Date)
  fechaCreacion: Date;

  @ApiProperty({ description: 'Fecha de finalización de la orden', required: false })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  fechaFinalizacion?: Date;

  @ApiProperty({ description: 'Estado de la orden', enum: EstadoOrdenInspeccion })
  @IsEnum(EstadoOrdenInspeccion)
  estado: EstadoOrdenInspeccion;

  @ApiProperty({ description: 'ID de la estación sismológica' })
  @IsNumber()
  estacionSismologicaId: number;

  @ApiProperty({ description: 'Nombre de la estación sismológica' })
  @IsString()
  estacionSismologicaNombre: string;

  @ApiProperty({ description: 'ID del sismógrafo' })
  @IsNumber()
  sismografoId: number;

  @ApiProperty({ description: 'Identificador del sismógrafo' })
  @IsString()
  sismografoIdentificador: string;

  @ApiProperty({ description: 'ID del responsable de inspección' })
  @IsNumber()
  responsableId: number;

  @ApiProperty({ description: 'Nombre del responsable de inspección' })
  @IsString()
  responsableNombre: string;

  @ApiProperty({ description: 'Resultado de la inspección', required: false })
  @IsString()
  @IsOptional()
  resultadoInspeccion?: string;

  @ApiProperty({ description: 'Fecha de cierre de la orden', required: false })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  fechaCierre?: Date;
}

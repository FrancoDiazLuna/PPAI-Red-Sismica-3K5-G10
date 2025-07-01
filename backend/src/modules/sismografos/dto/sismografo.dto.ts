import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEnum, IsDate, IsOptional, IsArray } from 'class-validator';
import { EstadoSismografo } from '../entities/sismografo.entity';
import { Type } from 'class-transformer';
import { MotivoFueraServicioDto } from '../../motivos-fuera-servicio/dto/motivo-fuera-servicio.dto';

export class SismografoDto {
  @ApiProperty({ description: 'ID del sismógrafo' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Identificador del sismógrafo' })
  @IsString()
  identificador: string;

  @ApiProperty({ description: 'Estado del sismógrafo', enum: EstadoSismografo })
  @IsEnum(EstadoSismografo)
  estado: EstadoSismografo;

  @ApiProperty({ description: 'Fecha del último cambio de estado', required: false })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  fechaUltimoCambioEstado?: Date;

  @ApiProperty({ description: 'ID de la estación sismológica' })
  @IsNumber()
  estacionId: number;

  @ApiProperty({ description: 'Nombre de la estación sismológica' })
  @IsString()
  estacionNombre: string;

  @ApiProperty({ description: 'Motivos de fuera de servicio', type: [MotivoFueraServicioDto], required: false })
  @IsArray()
  @IsOptional()
  motivosFueraServicio?: MotivoFueraServicioDto[];
}

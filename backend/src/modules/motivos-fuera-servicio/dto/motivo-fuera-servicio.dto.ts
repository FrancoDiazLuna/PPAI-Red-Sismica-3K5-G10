import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class MotivoFueraServicioDto {
  @ApiProperty({ description: 'ID del motivo de fuera de servicio' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Descripción del motivo' })
  @IsString()
  descripcion: string;

  @ApiProperty({ description: 'Tipo de motivo' })
  @IsString()
  tipo: string;
}

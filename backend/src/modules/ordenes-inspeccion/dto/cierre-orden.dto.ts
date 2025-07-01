import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsArray, ArrayMinSize } from 'class-validator';

export class CierreOrdenDto {
  @ApiProperty({ description: 'ID de la orden de inspección a cerrar' })
  @IsNumber()
  ordenInspeccionId: number;

  @ApiProperty({ description: 'Observación de cierre' })
  @IsString()
  observacion: string;

  @ApiProperty({ description: 'IDs de los motivos de fuera de servicio seleccionados', type: [Number] })
  @IsArray()
  @ArrayMinSize(1)
  motivosIds: number[];
}

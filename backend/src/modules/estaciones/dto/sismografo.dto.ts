import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, IsArray, IsDate } from "class-validator";
import { EstadoSismografo } from "../entities/sismografo.entity";
import { Type } from "class-transformer";

export class SismografoDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  identificador: string;

  @ApiProperty({ enum: EstadoSismografo })
  @IsEnum(EstadoSismografo)
  estado: EstadoSismografo;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fechaUltimoCambioEstado?: Date;

  @ApiProperty()
  @IsNumber()
  estacionId: number;

  @ApiProperty()
  @IsString()
  estacionNombre: string;

  @ApiProperty({ type: [Number], required: false })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  motivosFueraServicioIds?: number[];
}

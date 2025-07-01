import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class MotivoFueraServicioDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  descripcion: string;

  @ApiProperty()
  @IsString()
  tipo: string;
}

export class ListaMotivosFueraServicioDto {
  @ApiProperty({ type: [MotivoFueraServicioDto] })
  motivos: MotivoFueraServicioDto[];
}

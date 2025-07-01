import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CierreOrdenDto {
  @ApiProperty()
  @IsNumber()
  ordenInspeccionId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  observacion: string;

  @ApiProperty({ type: [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  motivosIds: number[];
}

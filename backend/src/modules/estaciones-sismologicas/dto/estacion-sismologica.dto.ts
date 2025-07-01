import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsBoolean, IsArray, IsOptional } from "class-validator";
import { SismografoDto } from "../../sismografos/dto/sismografo.dto";

export class EstacionSismologicaDto {
  @ApiProperty({ description: "ID de la estación sismológica" })
  @IsNumber()
  id: number;

  @ApiProperty({ description: "Nombre de la estación sismológica" })
  @IsString()
  nombre: string;

  @ApiProperty({ description: "Ubicación de la estación sismológica" })
  @IsString()
  ubicacion: string;

  @ApiProperty({ description: "Indica si la estación está activa" })
  @IsBoolean()
  activa: boolean;

  @ApiProperty({
    description: "Sismógrafos de la estación",
    type: [SismografoDto],
    required: false,
  })
  @IsArray()
  @IsOptional()
  sismografos?: SismografoDto[];
}

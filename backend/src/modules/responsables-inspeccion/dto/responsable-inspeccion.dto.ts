import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsEmail, IsArray, IsOptional } from "class-validator";
import { OrdenInspeccionDto } from "../../ordenes-inspeccion/dto/orden-inspeccion.dto";

export class ResponsableInspeccionDto {
  @ApiProperty({ description: "ID del responsable de inspección" })
  @IsNumber()
  id: number;

  @ApiProperty({ description: "Nombre del responsable de inspección" })
  @IsString()
  nombre: string;

  @ApiProperty({ description: "Usuario del responsable de inspección" })
  @IsString()
  usuario: string;

  @ApiProperty({ description: "Email del responsable de inspección" })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Órdenes de inspección asignadas",
    type: [OrdenInspeccionDto],
    required: false,
  })
  @IsArray()
  @IsOptional()
  ordenesInspeccion?: OrdenInspeccionDto[];
}

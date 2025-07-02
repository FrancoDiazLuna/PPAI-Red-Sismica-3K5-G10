import { ApiProperty } from "@nestjs/swagger";

class UsuarioDto {
  @ApiProperty({ description: "ID del usuario" })
  id: number;

  @ApiProperty({ description: "Nombre de usuario" })
  username: string;

  @ApiProperty({ description: "Nombre del usuario" })
  nombre: string;

  @ApiProperty({ description: "Apellido del usuario" })
  apellido: string;

  @ApiProperty({ description: "Rol del usuario" })
  rol: string;
}

class SesionDto {
  @ApiProperty({ description: "ID de la sesión" })
  id: number;

  @ApiProperty({ description: "Fecha y hora de inicio de la sesión" })
  fechaHoraInicio: Date;
}

export class LoginResponseDto {
  @ApiProperty({ description: "Indica si la operación fue exitosa", example: true })
  success: boolean;

  @ApiProperty({ description: "Token de acceso JWT", required: false })
  access_token?: string;

  @ApiProperty({ description: "Información del usuario", type: UsuarioDto, required: false })
  usuario?: UsuarioDto;

  @ApiProperty({ description: "Información de la sesión", type: SesionDto, required: false })
  sesion?: SesionDto;

  @ApiProperty({
    description: "Mensaje de error en caso de fallo",
    required: false,
    example: "Credenciales inválidas",
  })
  message?: string;
}

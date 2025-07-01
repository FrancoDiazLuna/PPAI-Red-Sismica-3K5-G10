import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { CustomLoggerService } from "../../common/services/logger.service";

@ApiTags("Autenticación")
@Controller("auth")
export class AuthController {
  private readonly logger = new CustomLoggerService("AuthController");

  constructor(private authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Iniciar sesión en el sistema" })
  @ApiResponse({
    status: 200,
    description: "Login exitoso o fallido",
    type: LoginResponseDto,
  })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    this.logger.log(`Intento de login para usuario: ${loginDto.username}`);
    const response: LoginResponseDto = await this.authService.login(loginDto);

    // Si no hay éxito, devolvemos un código de estado 401 (Unauthorized)
    if (!response.success) {
      return {
        success: false,
        message: response.message,
      };
    }

    return response;
  }
}

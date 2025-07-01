import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { LoginDto } from "../dto/login.dto";
import { CustomLoggerService } from "../../../common/services/logger.service";

@Controller("auth")
export class AuthController {
  private readonly logger = new CustomLoggerService("AuthController");

  constructor(private authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    this.logger.log(`Intento de login para usuario: ${loginDto.username}`);
    return this.authService.login(loginDto);
  }
}

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from "./entities/usuario.entity";
import { LoginDto } from "./dto/login.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { CustomLoggerService } from "../../common/services/logger.service";

@Injectable()
export class AuthService {
  private readonly logger = new CustomLoggerService("AuthService");

  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const usuario = await this.usuarioRepository.findOne({ where: { username } });

      if (!usuario) {
        this.logger.warn(`Usuario no encontrado: ${username}`);
        return null;
      }

      const isPasswordValid = await usuario.validatePassword(password);

      if (!isPasswordValid) {
        this.logger.warn(`Contraseña inválida para usuario: ${username}`);
        return null;
      }

      // Extraemos el password (no lo usamos) y nos quedamos con el resto de propiedades
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: passwordOmitted, ...result } = usuario;
      return result;
    } catch (error: any) {
      this.logger.error(`Error al validar usuario: ${error?.message || "Desconocido"}`);
      return null;
    }
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    try {
      const usuario = await this.validateUser(loginDto.username, loginDto.password);

      if (!usuario) {
        return {
          success: false,
          message: "Credenciales inválidas",
        };
      }

      const payload = {
        username: usuario.username,
        sub: usuario.id,
        rol: usuario.rol,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
      };

      this.logger.log(`Usuario autenticado: ${usuario.username}`);

      return {
        success: true,
        access_token: this.jwtService.sign(payload),
        usuario: {
          id: usuario.id,
          username: usuario.username,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          rol: usuario.rol,
        },
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Error en la autenticación";
      this.logger.error(`Error en login: ${errorMessage}`);
      return {
        success: false,
        message: errorMessage,
      };
    }
  }
}

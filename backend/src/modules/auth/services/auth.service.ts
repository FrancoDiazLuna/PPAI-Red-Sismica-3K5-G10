import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Usuario } from "../entities/usuario.entity";
import { LoginDto } from "../dto/login.dto";
import { CustomLoggerService } from "../../../common/services/logger.service";

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

      const { password: _, ...result } = usuario;
      return result;
    } catch (error: any) {
      this.logger.error(`Error al validar usuario: ${error?.message || "Desconocido"}`);
      return null;
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const usuario = await this.validateUser(loginDto.username, loginDto.password);

      if (!usuario) {
        return {
          success: false,
          error: "Credenciales inválidas",
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
    } catch (error: any) {
      this.logger.error(`Error en login: ${error?.message || "Desconocido"}`);
      return {
        success: false,
        error: error?.message || "Error al iniciar sesión",
      };
    }
  }
}

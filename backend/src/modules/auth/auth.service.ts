import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Usuario } from "./entities/usuario.entity";
import { Sesion } from "./entities/sesion.entity";
import { LoginDto } from "./dto/login.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { CustomLoggerService } from "../../common/services/logger.service";

@Injectable()
export class AuthService {
  private readonly logger = new CustomLoggerService("AuthService");

  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Sesion)
    private sesionRepository: Repository<Sesion>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { nombreUsuario: username },
        relations: ["empleado", "empleado.rol"],
      });

      if (!usuario) {
        this.logger.warn(`Usuario no encontrado: ${username}`);
        return null;
      }

      const isPasswordValid = await usuario.validatePassword(password);

      if (!isPasswordValid) {
        this.logger.warn(`Contraseña inválida para usuario: ${username}`);
        return null;
      }

      // Extraemos la contraseña (no la usamos) y nos quedamos con el resto de propiedades
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { contraseña, ...result } = usuario;
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

      // Crear una nueva sesión
      const nuevaSesion = this.sesionRepository.create({
        fechaHoraInicio: new Date(),
        usuario: usuario,
      });

      const sesionGuardada = await this.sesionRepository.save(nuevaSesion);

      const payload = {
        nombreUsuario: usuario.nombreUsuario,
        sub: usuario.id,
        empleadoId: usuario.empleado?.id,
        rolId: usuario.empleado?.rol?.id,
        rolNombre: usuario.empleado?.rol?.nombre,
      };

      this.logger.log(`Usuario autenticado: ${usuario.nombreUsuario}`);

      return {
        success: true,
        access_token: this.jwtService.sign(payload),
        usuario: {
          id: usuario.id,
          username: usuario.nombreUsuario,
          nombre: usuario.empleado?.nombre,
          apellido: usuario.empleado?.apellido,
          rol: usuario.empleado?.rol?.nombre,
        },
        sesion: {
          id: sesionGuardada.id,
          fechaHoraInicio: sesionGuardada.fechaHoraInicio,
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

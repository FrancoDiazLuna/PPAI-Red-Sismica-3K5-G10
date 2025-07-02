import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { Usuario } from "./entities/usuario.entity";
import { Sesion } from "./entities/sesion.entity";
import { Empleado } from "./entities/empleado.entity";
import { Rol } from "./entities/rol.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Sesion, Empleado, Rol]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      // Cambiado de async a sync ya que no hay operaciones asíncronas
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET") || "red-sismica-secret-key",
        signOptions: { expiresIn: "12h" },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

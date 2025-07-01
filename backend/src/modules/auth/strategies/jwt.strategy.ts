import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET") || "red-sismica-secret-key",
    });
  }

  // Cambiado de async a sync ya que no hay operaciones asíncronas
  validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username,
      rol: payload.rol,
      nombre: payload.nombre,
      apellido: payload.apellido,
    };
  }
}

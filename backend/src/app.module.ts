import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerModule } from "./common/logger.module";
import { AuthModule } from "./modules/auth/auth.module";
import { GestoresModule } from "./modules/gestores/gestores.module";

// Nuevos módulos refactorizados
import { OrdenesInspeccionModule } from "./modules/ordenes-inspeccion/ordenes-inspeccion.module";
import { EstacionesSismologicasModule } from "./modules/estaciones-sismologicas/estaciones-sismologicas.module";
import { SismografosModule } from "./modules/sismografos/sismografos.module";
import { MotivosFueraServicioModule } from "./modules/motivos-fuera-servicio/motivos-fuera-servicio.module";
import { ResponsablesInspeccionModule } from "./modules/responsables-inspeccion/responsables-inspeccion.module";
import { ObservacionesCierreModule } from "./modules/observaciones-cierre/observaciones-cierre.module";
import { NotificacionesModule } from "./modules/notificaciones/notificaciones.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): DataSourceOptions => {
        const options: DataSourceOptions = {
          type: "sqlite",
          database: "red-sismica.sqlite",
          entities: [__dirname + "/**/*.entity{.ts,.js}"],
          synchronize: configService.get("NODE_ENV") === "development",
          logging: configService.get("NODE_ENV") === "development",
        };
        return options;
      },
    }),
    LoggerModule,
    AuthModule,
    GestoresModule,
    // Nuevos módulos refactorizados
    OrdenesInspeccionModule,
    EstacionesSismologicasModule,
    SismografosModule,
    MotivosFueraServicioModule,
    ResponsablesInspeccionModule,
    ObservacionesCierreModule,
    NotificacionesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

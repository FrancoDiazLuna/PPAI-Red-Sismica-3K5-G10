import { NestFactory } from "@nestjs/core";
import { AppModule } from "./src/app.module";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import { CustomLoggerService } from "./src/common/services/logger.service";

async function bootstrap() {
  // Crear un logger personalizado para la aplicación
  const logger = new CustomLoggerService("Bootstrap");

  try {
    // Crear la aplicación NestJS con tipo específico para Express
    logger.log("Iniciando aplicación NestJS...");
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    logger.log("Aplicación NestJS creada correctamente");

    // Obtener el servicio de configuración
    const configService = app.get(ConfigService);
    const apiPrefix = configService.get<string>("API_PREFIX", "api");
    const port = configService.get<number>("PORT", 8080);
    const environment = configService.get<string>("NODE_ENV", "development");

    logger.log(
      `Configuración cargada: API_PREFIX=${apiPrefix}, PORT=${port}, NODE_ENV=${environment}`,
    );

    // Configuración global de la aplicación
    app.setGlobalPrefix(apiPrefix);

    // Habilitar versionado de API
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: "1",
    });

    // Configuración de validación global
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Elimina propiedades no decoradas
        forbidNonWhitelisted: true, // Lanza error si hay propiedades no decoradas
        transform: true, // Transforma los datos según los tipos
        transformOptions: {
          enableImplicitConversion: true, // Permite conversión implícita de tipos
        },
      }),
    );

    // Configuración de CORS
    app.enableCors({
      origin: true, // Permite todas las origenes en desarrollo
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      credentials: true,
    });

    // Configuración de Swagger
    if (environment !== "production") {
      const config = new DocumentBuilder()
        .setTitle("Red Sísmica API")
        .setDescription("API para la gestión de datos sísmicos")
        .setVersion("1.0")
        .addBearerAuth() // Para futura autenticación
        .addTag("sismos", "Operaciones relacionadas con datos sísmicos")
        .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup(`${apiPrefix}/docs`, app, document, {
        swaggerOptions: {
          persistAuthorization: true,
        },
      });
    }

    // Iniciar el servidor
    await app.listen(port);

    // Obtener la URL después de iniciar el servidor
    const appUrl = await app.getUrl();
    logger.log(`Application is running on: ${appUrl}`);
    logger.log(`Environment: ${environment}`);

    // Mostrar URL de Swagger después de iniciar el servidor
    if (environment !== "production") {
      logger.log(
        `Swagger documentation available at ${appUrl}/${apiPrefix}/docs`,
      );
    }

    return app;
  } catch (error) {
    const err = error as Error;
    logger.error(`Error al iniciar la aplicación: ${err.message}`, err.stack);
    process.exit(1);
  }
}

bootstrap().catch((err) => {
  console.error("Error starting application:", err);
  process.exit(1);
});

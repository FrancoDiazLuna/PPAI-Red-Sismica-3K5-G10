import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EstacionSismologica } from "../modules/estaciones/entities/estacion.entity";
import {
  Sismografo,
  EstadoSismografo,
} from "../modules/estaciones/entities/sismografo.entity";
import { MotivoFueraServicio } from "../modules/estaciones/entities/motivo-fuera-servicio.entity";
import {
  OrdenInspeccion,
  EstadoOrdenInspeccion,
} from "../modules/ordenes/entities/orden-inspeccion.entity";
import { ResponsableInspeccion } from "../modules/ordenes/entities/responsable-inspeccion.entity";
import { CustomLoggerService } from "../common/services/logger.service";
import { Usuario, RolUsuario } from "../modules/auth/entities/usuario.entity";
import * as bcrypt from "bcrypt";

async function bootstrap() {
  const logger = new CustomLoggerService("SeedScript");
  logger.log("Iniciando script de inicialización de datos...");

  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    // Obtener los repositorios
    const estacionRepo = app.get<Repository<EstacionSismologica>>(
      getRepositoryToken(EstacionSismologica),
    );
    const sismografoRepo = app.get<Repository<Sismografo>>(
      getRepositoryToken(Sismografo),
    );
    const motivoRepo = app.get<Repository<MotivoFueraServicio>>(
      getRepositoryToken(MotivoFueraServicio),
    );
    const responsableRepo = app.get<Repository<ResponsableInspeccion>>(
      getRepositoryToken(ResponsableInspeccion),
    );
    const ordenRepo = app.get<Repository<OrdenInspeccion>>(
      getRepositoryToken(OrdenInspeccion),
    );
    const usuarioRepo = app.get<Repository<Usuario>>(
      getRepositoryToken(Usuario),
    );

    // Limpiar datos existentes
    logger.log("Limpiando datos existentes...");
    await ordenRepo.clear();
    await sismografoRepo.clear();
    await estacionRepo.clear();
    await motivoRepo.clear();
    await responsableRepo.clear();
    await usuarioRepo.clear();

    // Crear motivos de fuera de servicio
    logger.log("Creando motivos de fuera de servicio...");
    const motivos = await motivoRepo.save([
      { descripcion: "Falla de hardware", tipo: "Hardware" },
      { descripcion: "Error de calibración", tipo: "Calibración" },
      { descripcion: "Falta de mantenimiento", tipo: "Mantenimiento" },
      { descripcion: "Daño por condiciones ambientales", tipo: "Ambiental" },
      { descripcion: "Obsolescencia tecnológica", tipo: "Hardware" },
    ]);

    // Crear estaciones sismológicas
    logger.log("Creando estaciones sismológicas...");
    const estaciones = await estacionRepo.save([
      { nombre: "Estación Norte", ubicacion: "Región Norte" },
      { nombre: "Estación Sur", ubicacion: "Región Sur" },
      { nombre: "Estación Este", ubicacion: "Región Este" },
    ]);

    // Crear sismógrafos
    logger.log("Creando sismógrafos...");
    const sismografos = await sismografoRepo.save([
      {
        identificador: "SIS-001",
        estado: EstadoSismografo.EN_SERVICIO,
        estacion: estaciones[0],
      },
      {
        identificador: "SIS-002",
        estado: EstadoSismografo.EN_SERVICIO,
        estacion: estaciones[0],
      },
      {
        identificador: "SIS-003",
        estado: EstadoSismografo.EN_SERVICIO,
        estacion: estaciones[1],
      },
      {
        identificador: "SIS-004",
        estado: EstadoSismografo.EN_SERVICIO,
        estacion: estaciones[2],
      },
    ]);

    // Crear responsables de inspección
    logger.log("Creando responsables de inspección...");
    const responsables = await responsableRepo.save([
      {
        nombre: "Juan Pérez",
        usuario: "jperez",
        email: "jperez@redsismica.com",
      },
      {
        nombre: "María López",
        usuario: "mlopez",
        email: "mlopez@redsismica.com",
      },
    ]);

    // Crear órdenes de inspección
    logger.log("Creando órdenes de inspección...");
    const fechaCreacion1 = new Date();
    fechaCreacion1.setDate(fechaCreacion1.getDate() - 10);

    const fechaFinalizacion1 = new Date();
    fechaFinalizacion1.setDate(fechaFinalizacion1.getDate() - 2);

    const fechaCreacion2 = new Date();
    fechaCreacion2.setDate(fechaCreacion2.getDate() - 15);

    const fechaFinalizacion2 = new Date();
    fechaFinalizacion2.setDate(fechaFinalizacion2.getDate() - 5);

    const fechaCreacion3 = new Date();
    fechaCreacion3.setDate(fechaCreacion3.getDate() - 20);

    await ordenRepo.save([
      {
        fechaCreacion: fechaCreacion1,
        fechaFinalizacion: fechaFinalizacion1,
        estado: EstadoOrdenInspeccion.REALIZADA,
        estacionSismologica: estaciones[0],
        sismografo: sismografos[0],
        responsable: responsables[0],
        resultadoInspeccion:
          "Se detectó una posible anomalía en la calibración del sismógrafo.",
      },
      {
        fechaCreacion: fechaCreacion2,
        fechaFinalizacion: fechaFinalizacion2,
        estado: EstadoOrdenInspeccion.REALIZADA,
        estacionSismologica: estaciones[1],
        sismografo: sismografos[2],
        responsable: responsables[0],
        resultadoInspeccion:
          "El sismógrafo presenta desgaste en sus componentes internos.",
      },
      {
        fechaCreacion: fechaCreacion3,
        estado: EstadoOrdenInspeccion.PENDIENTE,
        estacionSismologica: estaciones[2],
        sismografo: sismografos[3],
        responsable: responsables[1],
      },
    ]);

    // Crear usuarios para autenticación
    logger.log("Creando usuarios para autenticación...");
    
    // Crear usuarios con contraseñas hasheadas manualmente
    const saltRounds = 10;
    const usuarios = await Promise.all([
      {
        username: "admin",
        password: await bcrypt.hash("admin123", saltRounds),
        nombre: "Administrador",
        apellido: "Sistema",
        rol: RolUsuario.ADMIN,
      },
      {
        username: "jperez",
        password: await bcrypt.hash("password123", saltRounds),
        nombre: "Juan",
        apellido: "Pérez",
        rol: RolUsuario.RESPONSABLE_INSPECCION,
      },
      {
        username: "mlopez",
        password: await bcrypt.hash("password123", saltRounds),
        nombre: "María",
        apellido: "López",
        rol: RolUsuario.RESPONSABLE_INSPECCION,
      },
      {
        username: "supervisor",
        password: await bcrypt.hash("super123", saltRounds),
        nombre: "Carlos",
        apellido: "Gómez",
        rol: RolUsuario.SUPERVISOR,
      },
    ]);
    
    // Guardar los usuarios con contraseñas ya hasheadas
    await usuarioRepo.save(usuarios);

    logger.log("Datos inicializados correctamente");
  } catch (error) {
    logger.error(`Error al inicializar datos: ${error.message}`);
    if (error.stack) {
      logger.error(error.stack);
    }
  } finally {
    await app.close();
  }
}

bootstrap();

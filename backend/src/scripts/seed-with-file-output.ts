import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { DataSource } from "typeorm";
import { EstacionSismologica } from "../modules/estaciones-sismologicas/entities/estacion-sismologica.entity";
import { Sismografo } from "../modules/sismografos/entities/sismografo.entity";
import { Estado } from "../modules/estados/entities/estado.entity";
import { CambioEstado } from "../modules/sismografos/entities/cambio-estado.entity";
import { MotivoFueraServicio } from "../modules/motivos-fuera-servicio/entities/motivo-fuera-servicio.entity";
import { MotivoTipo } from "../modules/motivos-fuera-servicio/entities/motivo-tipo.entity";
import { OrdenDeInspeccion } from "../modules/ordenes-inspeccion/entities/orden-inspeccion.entity";
import { ResponsableInspeccion } from "../modules/responsables-inspeccion/entities/responsable-inspeccion.entity";
import { Usuario } from "../modules/auth/entities/usuario.entity";
import { Rol } from "../modules/auth/entities/rol.entity";
import { Empleado } from "../modules/auth/entities/empleado.entity";
import * as bcrypt from "bcrypt";
import { DeepPartial } from "typeorm/common/DeepPartial";
import * as fs from "fs";

// Función para escribir en el archivo de log
function writeLog(message: string) {
  const logPath = "seed-log.txt";
  fs.appendFileSync(logPath, message + "\n");
  console.log(message);
}

// Limpiar el archivo de log existente
fs.writeFileSync("seed-log.txt", "=== INICIANDO SCRIPT DE SEED ===\n");

async function bootstrap() {
  writeLog("Función bootstrap iniciada");
  writeLog("Iniciando script de inicialización de datos...");

  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    // Obtener los repositorios
    const dataSource = app.get<DataSource>("DataSource");
    const estacionRepo = dataSource.getRepository(EstacionSismologica);
    const sismografoRepo = dataSource.getRepository(Sismografo);
    const cambioEstadoRepo = dataSource.getRepository(CambioEstado);
    const motivoRepo = dataSource.getRepository(MotivoFueraServicio);
    const motivoTipoRepo = dataSource.getRepository(MotivoTipo);
    const responsableRepo = dataSource.getRepository(ResponsableInspeccion);
    const ordenRepo = dataSource.getRepository(OrdenDeInspeccion);
    const usuarioRepo = dataSource.getRepository(Usuario);
    const rolRepo = dataSource.getRepository(Rol);
    const empleadoRepo = dataSource.getRepository(Empleado);
    const estadoRepo = dataSource.getRepository(Estado);

    // Limpiar datos existentes
    writeLog("Limpiando datos existentes...");
    await ordenRepo.delete({});
    await responsableRepo.delete({});
    await sismografoRepo.delete({});
    await cambioEstadoRepo.delete({});
    await motivoRepo.delete({});
    await motivoTipoRepo.delete({});
    await estacionRepo.delete({});
    await usuarioRepo.delete({});
    await rolRepo.delete({});
    await empleadoRepo.delete({});
    await estadoRepo.delete({});

    // Crear estados para diferentes ámbitos
    writeLog("Creando estados...");
    const estadosSismografo = await estadoRepo.save([
      { ambito: "SISMOGRAFO", nombreEstado: "EN_SERVICIO" },
      { ambito: "SISMOGRAFO", nombreEstado: "FUERA_DE_SERVICIO" },
      { ambito: "SISMOGRAFO", nombreEstado: "EN_MANTENIMIENTO" },
    ]);

    const estadosOrdenInspeccion = await estadoRepo.save([
      { ambito: "ORDEN_INSPECCION", nombreEstado: "PENDIENTE" },
      { ambito: "ORDEN_INSPECCION", nombreEstado: "REALIZADA" },
      { ambito: "ORDEN_INSPECCION", nombreEstado: "CERRADA" },
    ]);

    // Crear tipos de motivos
    writeLog("Creando tipos de motivos...");
    const tiposMotivo = await motivoTipoRepo.save([
      { descripcion: "HARDWARE" },
      { descripcion: "CALIBRACION" },
      { descripcion: "MANTENIMIENTO" },
      { descripcion: "AMBIENTAL" },
    ]);

    // Crear motivos de fuera de servicio
    writeLog("Creando motivos de fuera de servicio...");
    const motivoFueraServicio1 = await motivoRepo.save({
      comentario: "Falla de hardware",
      motivoTipo: tiposMotivo[0],
    });

    const motivoFueraServicio2 = await motivoRepo.save({
      comentario: "Error de calibración",
      motivoTipo: tiposMotivo[1],
    });

    const motivosFueraServicio = [motivoFueraServicio1, motivoFueraServicio2];

    // Guardamos el resto de motivos para referencia futura
    await motivoRepo.save({
      comentario: "Falta de mantenimiento",
      motivoTipo: tiposMotivo[2],
    });

    await motivoRepo.save({
      comentario: "Daño por condiciones ambientales",
      motivoTipo: tiposMotivo[3],
    });

    await motivoRepo.save({
      comentario: "Obsolescencia tecnológica",
      motivoTipo: tiposMotivo[0],
    });

    // Crear estaciones sismológicas
    writeLog("Creando estaciones sismológicas...");
    const estacion1 = await estacionRepo.save({
      nombre: "Estación Sismológica Córdoba",
      codigoEstacion: "CB-001",
      latitud: "-31.4201",
      longitud: "-64.1888",
      documentoCertificacionAdq: "CERT-003-2022",
      nroCertificacionAdquision: "NRO-003-2022",
      fechaSolicitudCertificacion: new Date(2022, 2, 10), // 10 de marzo de 2022
    } as DeepPartial<EstacionSismologica>);

    const estacion2 = await estacionRepo.save({
      nombre: "Estación Sismológica San Juan",
      codigoEstacion: "SJ-001",
      latitud: "-31.5375",
      longitud: "-68.5364",
      documentoCertificacionAdq: "CERT-001-2022",
      nroCertificacionAdquision: "NRO-001-2022",
      fechaSolicitudCertificacion: new Date(2022, 0, 15), // 15 de enero de 2022
    } as DeepPartial<EstacionSismologica>);

    const estacion3 = await estacionRepo.save({
      nombre: "Estación Sismológica Mendoza",
      codigoEstacion: "MZ-001",
      latitud: "-32.8908",
      longitud: "-68.8272",
      documentoCertificacionAdq: "CERT-002-2022",
      nroCertificacionAdquision: "NRO-002-2022",
      fechaSolicitudCertificacion: new Date(2022, 1, 20), // 20 de febrero de 2022
    } as DeepPartial<EstacionSismologica>);

    // Crear cambios de estado para sismógrafos
    writeLog("Creando cambios de estado para sismógrafos...");
    const cambioEstado1 = await cambioEstadoRepo.save({
      fechaHoraInicio: new Date(2022, 5, 15), // 15 de junio de 2022
      fechaHoraFin: undefined,
      estado: estadosSismografo[0], // EN_SERVICIO
      motivoFueraServicio: undefined,
    });

    const cambioEstado2 = await cambioEstadoRepo.save({
      fechaHoraInicio: new Date(2022, 6, 20), // 20 de julio de 2022
      fechaHoraFin: new Date(2022, 8, 1), // 1 de septiembre de 2022
      estado: estadosSismografo[1], // FUERA_DE_SERVICIO
      motivoFueraServicio: motivosFueraServicio[0],
    });

    const cambioEstado3 = await cambioEstadoRepo.save({
      fechaHoraInicio: new Date(2022, 7, 10), // 10 de agosto de 2022
      fechaHoraFin: undefined,
      estado: estadosSismografo[0], // EN_SERVICIO
      motivoFueraServicio: undefined,
    });

    const cambioEstado4 = await cambioEstadoRepo.save({
      fechaHoraInicio: new Date(2022, 8, 5), // 5 de septiembre de 2022
      fechaHoraFin: new Date(2022, 9, 15), // 15 de octubre de 2022
      estado: estadosSismografo[1], // FUERA_DE_SERVICIO
      motivoFueraServicio: motivosFueraServicio[1],
    });

    // Crear sismógrafos
    writeLog("Creando sismógrafos...");
    await sismografoRepo.save({
      identificadorSismografo: "SIS-001",
      nroSerie: "ST-2000",
      fechaAdquisicion: new Date(2022, 5, 15), // 15 de junio de 2022
      estacionSismologica: estacion2, // San Juan
      cambioEstado: cambioEstado1,
    } as DeepPartial<Sismografo>);

    await sismografoRepo.save({
      identificadorSismografo: "SIS-002",
      nroSerie: "ST-2000",
      fechaAdquisicion: new Date(2022, 6, 20), // 20 de julio de 2022
      estacionSismologica: estacion2, // San Juan
      cambioEstado: cambioEstado2,
    } as DeepPartial<Sismografo>);

    await sismografoRepo.save({
      identificadorSismografo: "SIS-003",
      nroSerie: "SP-1500",
      fechaAdquisicion: new Date(2022, 7, 10), // 10 de agosto de 2022
      estacionSismologica: estacion3, // Mendoza
      cambioEstado: cambioEstado3,
    } as DeepPartial<Sismografo>);

    await sismografoRepo.save({
      identificadorSismografo: "SIS-004",
      nroSerie: "SP-1500",
      fechaAdquisicion: new Date(2022, 8, 5), // 5 de septiembre de 2022
      estacionSismologica: estacion1, // Córdoba
      cambioEstado: cambioEstado4,
    } as DeepPartial<Sismografo>);

    writeLog("Sismógrafos creados exitosamente");

    // Crear responsables de inspección
    writeLog("Creando responsables de inspección...");
    await responsableRepo.save({
      nombre: "Juan Pérez",
      usuario: "jperez",
      email: "jperez@redsismica.com",
    });

    await responsableRepo.save({
      nombre: "María López",
      usuario: "mlopez",
      email: "mlopez@redsismica.com",
    });

    await responsableRepo.save({
      nombre: "Carlos Rodríguez",
      usuario: "crodriguez",
      email: "crodriguez@redsismica.com",
    });

    // Crear órdenes de inspección
    writeLog("Creando órdenes de inspección...");
    const fechaInicio1 = new Date();
    fechaInicio1.setDate(fechaInicio1.getDate() - 10);

    const fechaFinalizacion1 = new Date();
    fechaFinalizacion1.setDate(fechaFinalizacion1.getDate() - 2);

    const fechaInicio2 = new Date();
    fechaInicio2.setDate(fechaInicio2.getDate() - 15);

    const fechaFinalizacion2 = new Date();
    fechaFinalizacion2.setDate(fechaFinalizacion2.getDate() - 5);

    const fechaInicio3 = new Date();
    fechaInicio3.setDate(fechaInicio3.getDate() - 20);

    // Ya no necesitamos crear cambios de estado para órdenes de inspección
    // porque ahora la entidad OrdenDeInspeccion tiene una relación directa con Estado
    writeLog("Configurando estados para órdenes de inspección...");

    // Crear órdenes de inspección
    await ordenRepo.save({
      nroOrden: "OI-001",
      fechaHoraInicio: fechaInicio1,
      fechaHoraFinalizacion: fechaFinalizacion1,
      fechaHoraCierre: undefined,
      observacionCierre: undefined,
      estado: estadosOrdenInspeccion[1], // REALIZADA
      estacionSismologica: estacion2, // San Juan
    } as DeepPartial<OrdenDeInspeccion>);

    await ordenRepo.save({
      nroOrden: "OI-002",
      fechaHoraInicio: fechaInicio2,
      fechaHoraFinalizacion: fechaFinalizacion2,
      fechaHoraCierre: undefined,
      observacionCierre: undefined,
      estado: estadosOrdenInspeccion[1], // REALIZADA
      estacionSismologica: estacion3, // Mendoza
    } as DeepPartial<OrdenDeInspeccion>);

    await ordenRepo.save({
      nroOrden: "OI-003",
      fechaHoraInicio: fechaInicio3,
      fechaHoraFinalizacion: undefined,
      fechaHoraCierre: undefined,
      observacionCierre: undefined,
      estado: estadosOrdenInspeccion[0], // PENDIENTE
      estacionSismologica: estacion1, // Córdoba
    } as DeepPartial<OrdenDeInspeccion>);

    writeLog("Órdenes de inspección creadas exitosamente");

    // Crear roles
    writeLog("Creando roles...");
    const rolAdmin = await rolRepo.save({
      nombre: "ADMIN",
      descripcion: "Administrador del sistema",
    });

    const rolUsuario = await rolRepo.save({
      nombre: "USUARIO",
      descripcion: "Usuario regular del sistema",
    });

    // Crear usuarios
    writeLog("Creando usuarios...");
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash("admin123", salt);

    await usuarioRepo.save({
      nombre: "Admin",
      apellido: "Sistema",
      nombreUsuario: "admin",
      password: hashedPassword,
      email: "admin@redsismica.com",
      rol: rolAdmin,
    });

    await usuarioRepo.save({
      nombre: "Usuario",
      apellido: "Regular",
      nombreUsuario: "usuario",
      password: hashedPassword,
      email: "usuario@redsismica.com",
      rol: rolUsuario,
    });

    // Crear empleados
    writeLog("Creando empleados...");
    await empleadoRepo.save({
      legajo: "E001",
      nombre: "Juan",
      apellido: "Pérez",
      email: "jperez@redsismica.com",
    });

    await empleadoRepo.save({
      legajo: "E002",
      nombre: "María",
      apellido: "López",
      email: "mlopez@redsismica.com",
    });

    writeLog("Datos inicializados correctamente");
  } catch (error) {
    writeLog(`Error al inicializar datos: ${error.message}`);
    if (error.stack) {
      writeLog(error.stack);
    }
  } finally {
    await app.close();
    writeLog("Script finalizado");
  }
}

// Ejecutamos el script
void bootstrap();

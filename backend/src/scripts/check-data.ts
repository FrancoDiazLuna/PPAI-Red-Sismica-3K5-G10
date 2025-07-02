import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { DataSource } from "typeorm";
import { EstacionSismologica } from "../modules/estaciones-sismologicas/entities/estacion-sismologica.entity";
import { Sismografo } from "../modules/sismografos/entities/sismografo.entity";
import { OrdenDeInspeccion } from "../modules/ordenes-inspeccion/entities/orden-inspeccion.entity";
import { ResponsableInspeccion } from "../modules/responsables-inspeccion/entities/responsable-inspeccion.entity";
import { Usuario } from "../modules/auth/entities/usuario.entity";

async function checkData() {
  console.log("=== VERIFICANDO DATOS EN LA BASE DE DATOS ===");

  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    // Obtener los repositorios
    const dataSource = app.get<DataSource>("DataSource");
    const estacionRepo = dataSource.getRepository(EstacionSismologica);
    const sismografoRepo = dataSource.getRepository(Sismografo);
    const responsableRepo = dataSource.getRepository(ResponsableInspeccion);
    const ordenRepo = dataSource.getRepository(OrdenDeInspeccion);
    const usuarioRepo = dataSource.getRepository(Usuario);

    // Verificar estaciones sismológicas
    const estaciones = await estacionRepo.find();
    console.log(`Estaciones sismológicas: ${estaciones.length}`);
    estaciones.forEach((estacion) => {
      console.log(`- ${estacion.nombre} (${estacion.codigoEstacion})`);
    });

    // Verificar sismógrafos
    const sismografos = await sismografoRepo.find({ relations: ["estacionSismologica"] });
    console.log(`\nSismógrafos: ${sismografos.length}`);
    sismografos.forEach((sismografo) => {
      console.log(
        `- ${sismografo.identificadorSismografo} (${sismografo.nroSerie}) - Estación: ${sismografo.estacionSismologica?.nombre || "N/A"}`,
      );
    });

    // Verificar responsables de inspección
    const responsables = await responsableRepo.find();
    console.log(`\nResponsables de inspección: ${responsables.length}`);
    responsables.forEach((responsable) => {
      console.log(`- ${responsable.nombre} (${responsable.email})`);
    });

    // Verificar órdenes de inspección
    const ordenes = await ordenRepo.find({ relations: ["estacionSismologica", "estado"] });
    console.log(`\nÓrdenes de inspección: ${ordenes.length}`);
    ordenes.forEach((orden) => {
      console.log(
        `- Orden ${orden.nroOrden} - Estado: ${orden.estado?.nombreEstado || "N/A"} - Estación: ${orden.estacionSismologica?.nombre || "N/A"}`,
      );
    });

    // Verificar usuarios
    const usuarios = await usuarioRepo.find({ relations: ["rol"] });
    console.log(`\nUsuarios: ${usuarios.length}`);
    usuarios.forEach((usuario) => {
      console.log(`- ${usuario.nombreUsuario} - Rol: ${(usuario as any).rol?.nombre || "N/A"}`);
    });
  } catch (error) {
    console.error(`Error al verificar datos: ${error.message}`);
    if (error.stack) {
      console.error(error.stack);
    }
  } finally {
    await app.close();
  }
}

// Ejecutamos el script
void checkData();

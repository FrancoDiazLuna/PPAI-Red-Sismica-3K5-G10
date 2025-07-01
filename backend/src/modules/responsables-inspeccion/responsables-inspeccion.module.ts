import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ResponsableInspeccion } from "./entities/responsable-inspeccion.entity";
import { ResponsableInspeccionService } from "./responsable-inspeccion.service";

@Module({
  imports: [TypeOrmModule.forFeature([ResponsableInspeccion])],
  providers: [ResponsableInspeccionService],
  exports: [ResponsableInspeccionService],
})
export class ResponsablesInspeccionModule {}

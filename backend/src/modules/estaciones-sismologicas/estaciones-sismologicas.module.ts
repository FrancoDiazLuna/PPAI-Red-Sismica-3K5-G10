import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstacionSismologica } from './entities/estacion-sismologica.entity';
import { EstacionSismologicaService } from './services/estacion-sismologica.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstacionSismologica])
  ],
  providers: [EstacionSismologicaService],
  exports: [EstacionSismologicaService],
})
export class EstacionesSismologicasModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObservacionCierre } from './entities/observacion-cierre.entity';
import { ObservacionCierreService } from './services/observacion-cierre.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ObservacionCierre])
  ],
  providers: [ObservacionCierreService],
  exports: [ObservacionCierreService],
})
export class ObservacionesCierreModule {}

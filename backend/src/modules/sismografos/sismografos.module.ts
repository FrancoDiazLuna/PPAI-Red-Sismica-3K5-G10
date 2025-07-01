import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sismografo } from './entities/sismografo.entity';
import { SismografoService } from './services/sismografo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sismografo])
  ],
  providers: [SismografoService],
  exports: [SismografoService],
})
export class SismografosModule {}

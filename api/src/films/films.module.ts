import { Module } from '@nestjs/common';
import { FilmsResolver } from './films.resolver';
import { FilmsService } from './films.service';

@Module({
  providers: [FilmsResolver, FilmsService],
  exports: [FilmsService],
})
export class FilmsModule {}

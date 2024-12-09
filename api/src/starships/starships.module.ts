import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsResolver } from './starships.resolver';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [CacheModule.register('starships-module')],
  providers: [StarshipsResolver, StarshipsService],
  exports: [StarshipsService],
})
export class StarshipsModule {}

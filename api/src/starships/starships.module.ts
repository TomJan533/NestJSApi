import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsResolver } from './starships.resolver';

@Module({
  providers: [StarshipsResolver, StarshipsService],
  exports: [StarshipsService],
})
export class StarshipsModule {}

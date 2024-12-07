import { Module, DynamicModule } from '@nestjs/common';
import { CacheService } from './cache.service';

@Module({})
export class CacheModule {
  static register(namespace: string): DynamicModule {
    return {
      module: CacheModule,
      providers: [
        {
          provide: CacheService,
          useFactory: () => new CacheService(namespace),
        },
      ],
      exports: [CacheService],
    };
  }
}

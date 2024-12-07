import {
  Injectable,
  OnModuleDestroy,
  OnApplicationShutdown,
} from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService implements OnModuleDestroy, OnApplicationShutdown {
  private redis: Redis;
  private namespace: string;

  constructor(namespace = '') {
    const host = process.env.REDIS_HOST || 'localhost';
    const port = parseInt(process.env.REDIS_PORT, 10) || 6379;

    this.redis = new Redis({ host, port });

    this.redis.on('connect', () => {
      console.log('[CacheService] Connected to Redis');
    });

    this.redis.on('error', (err) => {
      console.error('[CacheService] Redis error:', err.message);
    });

    this.redis.on('close', () => {
      console.log('[CacheService] Redis connection closed');
    });

    this.namespace = namespace ? `${namespace}:` : '';
  }

  private formatKey(key: string): string {
    return `${this.namespace}${key}`;
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(this.formatKey(key));
    return data ? (JSON.parse(data) as T) : null;
  }

  async set<T>(key: string, value: T, ttl: number): Promise<void> {
    await this.redis.set(this.formatKey(key), JSON.stringify(value), 'EX', ttl);
  }

  async clearNamespace(): Promise<void> {
    const keys = await this.redis.keys(`${this.namespace}*`);
    if (keys.length) {
      await this.redis.del(keys);
    }
  }

  async quit(): Promise<void> {
    console.log('[CacheService] Quitting Redis connection');
    if (this.redis.status !== 'end') {
      console.log(
        '[CacheService] Pending Redis operations:',
        this.redis.commandQueue.length,
      );

      await this.redis.quit();

      // Grace period to ensure Redis connection is fully closed
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  async onModuleDestroy() {
    console.log('[CacheService] Module being destroyed');
    await this.quit();
  }

  async onApplicationShutdown() {
    console.log('[CacheService] Application shutting down');
    await this.quit();
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '../../src/cache/cache.module';
import { CacheService } from '../../src/cache/cache.service';

describe('CacheModule', () => {
  let module: TestingModule;
  let cacheService: CacheService;
  let originalConsoleLog: typeof console.log;

  beforeAll(() => {
    originalConsoleLog = console.log;
    console.log = jest.fn();
  });

  afterAll(() => {
    console.log = originalConsoleLog;
  });

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [CacheModule.register('test-namespace')],
    }).compile();

    cacheService = module.get<CacheService>(CacheService);
  });

  afterEach(async () => {
    if (cacheService) {
      await cacheService.clearNamespace();
      await cacheService.quit();
    }
    await module.close();
  });

  it('should initialize the module', () => {
    expect(module).toBeDefined();
  });

  it('should provide CacheService', () => {
    expect(cacheService).toBeDefined();
  });

  it('should create a CacheService instance with correct namespace', () => {
    expect(cacheService).toBeInstanceOf(CacheService);
    expect(cacheService['namespace']).toBe('test-namespace:');
  });

  it('should perform Redis operations', async () => {
    const key = 'test-key';
    const value = { message: 'hello' };

    await cacheService.set(key, value, 10);
    const retrievedValue = await cacheService.get<typeof value>(key);
    expect(retrievedValue).toEqual(value);

    // Ensure Redis commands have completed
    await new Promise((resolve) => setTimeout(resolve, 100));
  });
});

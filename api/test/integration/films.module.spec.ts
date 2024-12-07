import { Test, TestingModule } from '@nestjs/testing';
import { FilmsModule } from '../../src/films/films.module';
import { FilmsResolver } from '../../src/films/films.resolver';
import { FilmsService } from '../../src/films/films.service';
import { CacheModule } from '../../src/cache/cache.module';
import { CacheService } from '../../src/cache/cache.service';

describe('FilmsModule', () => {
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
      imports: [FilmsModule, CacheModule.register('films-module-test')],
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

  it('should provide FilmsResolver', () => {
    const resolver = module.get<FilmsResolver>(FilmsResolver);
    expect(resolver).toBeDefined();
  });

  it('should provide FilmsService', () => {
    const service = module.get<FilmsService>(FilmsService);
    expect(service).toBeDefined();
  });

  it('should resolve CacheService in FilmsService', () => {
    const service = module.get<FilmsService>(FilmsService);
    expect(service['cacheService']).toBeDefined();
  });

  it('should perform Redis operations via CacheService', async () => {
    const key = 'test-key';
    const value = { message: 'test-value' };

    await cacheService.set(key, value, 10);
    const retrievedValue = await cacheService.get<typeof value>(key);
    expect(retrievedValue).toEqual(value);

    // Ensure Redis commands have completed
    await new Promise((resolve) => setTimeout(resolve, 100));
  });
});

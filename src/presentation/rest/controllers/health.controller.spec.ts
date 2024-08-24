import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthUseCase } from '@/application/use-cases/health.use-case';

describe('HealthController', () => {
  let controller: HealthController;
  let healthUseCaseMock: jest.Mocked<HealthUseCase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    healthUseCaseMock = module.get(HealthUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('handle', () => {
    it('should call healthUseCase.execute', () => {
      healthUseCaseMock.execute.mockReturnValue({
        status: 'ok',
        timestamp: '2024-06-17T19:39:53.859Z',
      });

      const result = controller.hanlder();

      expect(result).toStrictEqual({
        status: 'ok',
        timestamp: '2024-06-17T19:39:53.859Z',
      });
    });
  });
});

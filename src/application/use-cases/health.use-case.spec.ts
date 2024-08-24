import { HealthUseCase } from './health.use-case';

describe('HealthUseCase', () => {
  let healthUseCase: HealthUseCase;

  beforeEach(() => {
    healthUseCase = new HealthUseCase();
  });

  it('should return a health status object', () => {
    const result = healthUseCase.execute();

    expect(result).toHaveProperty('status', 'ok');
    expect(result).toHaveProperty('timestamp');

    expect(typeof result.timestamp).toBe('string');

    const date = new Date(result.timestamp);
    expect(date.toString()).not.toBe('Invalid Date');
  });
});

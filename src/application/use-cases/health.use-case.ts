import { Injectable } from '@nestjs/common';
import { HealthDto } from '../dto/health';
import { UseCase } from './use-case.interface';

@Injectable()
export class HealthUseCase implements UseCase<HealthDto> {
  execute() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}

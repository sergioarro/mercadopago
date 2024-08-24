import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthStatusDto } from '../docs/health-response-success.doc';
import { HealthUseCase } from '@/application/use-cases/health.use-case';

@Controller('health')
@ApiTags('Health')
export class HealthController {
  constructor(private readonly useCase: HealthUseCase) {}
  @Get()
  @ApiOperation({ summary: 'Check the health status of the application' })
  @ApiOkResponse({
    description: 'The health status is successfully retrieved.',
    type: HealthStatusDto,
  })
  hanlder(): HealthStatusDto {
    return this.useCase.execute();
  }
}

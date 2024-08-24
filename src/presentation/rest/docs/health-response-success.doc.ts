import { ApiProperty } from '@nestjs/swagger';

export class HealthStatusDto {
  @ApiProperty({
    example: 'OK',
    description: 'The health status of the application',
  })
  status: string;

  @ApiProperty({
    example: new Date().toISOString(),
    description: 'The timestamp when the health check was performed',
  })
  timestamp: string;
}

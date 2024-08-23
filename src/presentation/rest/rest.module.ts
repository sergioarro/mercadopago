import { Module } from '@nestjs/common';
import { HealthController } from '@/presentation/rest/controllers/health.controller';
import { ApplicationModule } from '@/application/application.module';

@Module({
  controllers: [HealthController],
  imports: [ApplicationModule],
})
export class RestModule {}

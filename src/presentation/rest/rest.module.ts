import { Module } from '@nestjs/common';
import { HealthController } from '@/presentation/rest/controllers/health.controller';
import { ApplicationModule } from '@/application/application.module';
import { ItemController } from '@/presentation/rest/controllers/item.controller';

@Module({
  controllers: [HealthController, ItemController],
  imports: [ApplicationModule],
})
export class RestModule {}

import { Module } from '@nestjs/common';
import { RestModule } from '@/presentation/rest/rest.module';

@Module({
  imports: [RestModule],
})
export class PresentationModule {}

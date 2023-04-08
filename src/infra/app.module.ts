import { Module } from '@nestjs/common';
import { HttpModule } from './http/modules/http.module';

@Module({
  imports: [HttpModule],
})
export class AppModule {}

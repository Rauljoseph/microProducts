import { Module } from '@nestjs/common';
import { ProductModule } from './infrastructure/modules/product.module';
import { DatabaseModule } from './infrastructure/database/sequelizePG';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './infrastructure/controllers/health';
import { AppController } from './infrastructure/controllers/root';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductModule,
    DatabaseModule,
  ],
  controllers: [HealthController, AppController],
})
export class AppModule {}

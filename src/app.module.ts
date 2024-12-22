import { Module } from '@nestjs/common';
import { ProductModule } from './infrastructure/modules/product.module';
import { DatabaseModule } from './infrastructure/database/sequelizePG';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductModule,
    DatabaseModule,
  ],
})
export class AppModule {}

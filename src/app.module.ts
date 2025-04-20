import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from './location/location.module';
import { Location } from './location/location.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: +(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME ?? 'admin',
      password: process.env.DB_PASSWORD ?? 'admin',
      database: process.env.DB_NAME ?? 'location',
      entities: [Location],
      synchronize: true, // auto-migration
    }),
    LocationModule,
  ],
})
export class AppModule {}

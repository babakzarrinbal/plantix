import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorsModule } from './sensors/sensors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get('DATABASE_NAME'),
        autoLoadEntities: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<string>('TYPEORM_SYNC') === 'true', // Be cautious with this in production
      }),
    }),
    SensorsModule,
  ],
})
export class AppModule {}

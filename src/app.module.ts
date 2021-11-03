import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [configuration],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(`database.${process.env.DATABASE_TYPE}.host`),
        port: +configService.get<number>(
          `database.${process.env.DATABASE_TYPE}.port`,
        ),
        username: configService.get(
          `database.${process.env.DATABASE_TYPE}.username`,
        ),
        password: configService.get(
          `database.${process.env.DATABASE_TYPE}.password`,
        ),
        database: configService.get(
          `database.${process.env.DATABASE_TYPE}.database`,
        ),
        entities: [],
        synchronize: false,
        autoLoadEntities: true,
        logging: false,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

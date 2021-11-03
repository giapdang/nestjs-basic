import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const isDisabledSwagger =
    process.env.SWAGGER_DISABLE === 'true' ? true : false;

  if (!isDisabledSwagger) {
    const swaggerPath = process.env.SWAGGER_PATH || 'api';
    const config = new DocumentBuilder()
      .setTitle(process.env.SWAGGER_TITLE || 'Training API')
      .setDescription(
        process.env.SWAGGER_DESCRIPTION || 'Training API document',
      )
      .setVersion(process.env.SWAGGER_VERSION || '1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(swaggerPath, app, document);
  }
  await app.listen(3000);
}
bootstrap();

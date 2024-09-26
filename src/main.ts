import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApplicationModule } from "./application/application.module";

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, {
    // logger: ["error", "warn", "log"],
  });

  app.setGlobalPrefix("/api/v1");

  //Config swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Clean Architecture Example")
    .setDescription("The Clean Architecture API description")
    .setVersion("1.0")
    .addTag("Clean Architecture")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });
  SwaggerModule.setup("api", app, document, {
    jsonDocumentUrl: "api/json",
    swaggerUiEnabled: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  //Run app
  const appConfig = app.get(ConfigService);
  await app.listen(appConfig.get<number>("port"));
}
bootstrap();

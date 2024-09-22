import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn"],
  });

  //Config swagger
  const config = new DocumentBuilder()
    .setTitle("Clean Architecture Example")
    .setDescription("The Clean Architecture API description")
    .setVersion("1.0")
    .addTag("Clean Architecture")
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });
  SwaggerModule.setup("api", app, document, {
    jsonDocumentUrl: "api/json",
    swaggerUiEnabled: true,
  });
  //Run app
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { MyService } from "./services/my.service";
import { MyLogger } from "./services/logger.service";
import * as dotenv from "dotenv";
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: new MyLogger()
  });
  
  const config = new DocumentBuilder()
    .setTitle("Clean Architecture Example")
    .setDescription("The Clean Architecture API description")
    .setVersion("1.0")
    .addTag("Clean Architecture")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });

  const service = app.get(MyService);
  service.online({
    name: "Test 21"
  });
}

bootstrap();

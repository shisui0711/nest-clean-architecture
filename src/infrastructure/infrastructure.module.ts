import { MikroOrmModule } from "@mikro-orm/nestjs";
import { SqliteDriver } from "@mikro-orm/sqlite";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ["dist/**/*.entity.js"],
      entitiesTs: ["src/**/*.entity.ts"],
      dbName: "my-db-name.sqlite3",
      tsNode: true,
      driver: SqliteDriver,
    }),
  ],
  providers: [],
})
export class InfrastructureModule {}

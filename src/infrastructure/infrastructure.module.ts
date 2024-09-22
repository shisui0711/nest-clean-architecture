import { Module } from "@nestjs/common";
import { databaseProviders } from "./Data/database.provider";

@Module({
  imports: [],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class InfrastructureModule {}

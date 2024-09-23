import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, type Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { TodoItem } from "src/domain/entities/todo-item.entity";
import { TodoItemDto } from "../models/todo-item.dto";
import { TodoList } from "src/domain/entities/todo-list.entity";
import { TodoListDto } from "../models/todo-list.dto";
import { SignUpCommand } from "src/application/identities/commands/sign-up.command";
import { User } from "src/domain/entities/user.entity";

@Injectable()
export class MapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, TodoItem, TodoItemDto);
      createMap(mapper, TodoList, TodoListDto);
      createMap(mapper, SignUpCommand, User);
    };
  }
}

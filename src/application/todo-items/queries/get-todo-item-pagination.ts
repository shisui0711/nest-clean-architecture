import { EntityManager } from "@mikro-orm/sqlite";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

export class GetTodoItemPaginationQuery {
  constructor(
    public readonly listId: string,
    public readonly pageNumber: number,
    public readonly pageSize: number,
  ) {}
}

@QueryHandler(GetTodoItemPaginationQuery)
export class GetTodoItemPaginationHandler
  implements IQueryHandler<GetTodoItemPaginationQuery>
{
  constructor(private readonly em: EntityManager) {}

  async execute(query: GetTodoItemPaginationQuery): Promise<any> {
    return query;
  }
}
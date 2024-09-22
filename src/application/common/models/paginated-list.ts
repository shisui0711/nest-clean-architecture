export class PaginatedList<T> {
  public items: Readonly<T>;
  public pageNumber: number;
  public totalPages: number;
  public totalCount: number;

  constructor(
    items: Readonly<T>,
    count: number,
    pageNumber: number,
    pageSize: number,
  ) {
    this.pageNumber = pageNumber;
    this.totalPages = Math.ceil(count / pageSize);
    this.totalCount = count;
    items = items;
  }

  public hasPreviousPage(): boolean {
    return this.pageNumber > 1;
  }

  public hasNextPage(): boolean {
    return this.pageNumber < this.totalPages;
  }
}

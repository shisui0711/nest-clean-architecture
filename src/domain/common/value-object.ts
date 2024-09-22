import { isEqual } from "lodash";

export abstract class ValueObject {
  protected static equalOperator(
    left: ValueObject | null,
    right: ValueObject | null,
  ): boolean {
    if ((left === null) !== (right === null)) {
      return false;
    }

    return left?.equals(right!) !== false;
  }

  protected static notEqualOperator(
    left: ValueObject | null,
    right: ValueObject | null,
  ): boolean {
    return !ValueObject.equalOperator(left, right);
  }

  protected abstract getEqualityComponents(): Iterable<object>;

  public equals(obj: object | null): boolean {
    if (obj === null || obj.constructor !== this.constructor) {
      return false;
    }

    const other = obj as ValueObject;
    return isEqual(
      Array.from(this.getEqualityComponents()),
      Array.from(other.getEqualityComponents()),
    );
  }

  public getHashCode(): number {
    const hash = new Map<any, number>();

    for (const component of this.getEqualityComponents()) {
      hash.set(component, (hash.get(component) || 0) + 1);
    }

    return Array.from(hash.values()).reduce((acc, val) => acc + val, 0);
  }
}

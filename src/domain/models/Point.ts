export class Point {
  public readonly x: number
  public readonly y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  static create(x: number, y: number): Point {
    return new Point(x, y)
  }

  add(other: Point): Point {
    return new Point(this.x + other.x, this.y + other.y)
  }

  subtract(other: Point): Point {
    return new Point(this.x - other.x, this.y - other.y)
  }

  distanceTo(other: Point): number {
    const dx = this.x - other.x
    const dy = this.y - other.y
    return Math.sqrt(dx * dx + dy * dy)
  }
}

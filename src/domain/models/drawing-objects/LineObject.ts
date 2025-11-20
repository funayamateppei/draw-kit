import {Point} from "../Point"
import {BaseDrawingObject} from "./BaseDrawingObject"

export class LineObject extends BaseDrawingObject {
  public readonly start: Point
  public readonly end: Point

  constructor(id: string, type: "line" | "arrow", color: string, width: number, start: Point, end: Point) {
    super(id, type, color, width)
    this.start = start
    this.end = end
  }

  move(delta: Point): LineObject {
    return new LineObject(
      this.id,
      this.type as "line" | "arrow",
      this.color,
      this.width,
      this.start.add(delta),
      this.end.add(delta),
    )
  }

  clone(): LineObject {
    return new LineObject(this.id, this.type as "line" | "arrow", this.color, this.width, this.start, this.end)
  }

  updateEnd(newEnd: Point): LineObject {
    return new LineObject(this.id, this.type as "line" | "arrow", this.color, this.width, this.start, newEnd)
  }
}

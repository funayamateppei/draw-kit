import {Point} from "../Point"
import {BaseDrawingObject} from "./BaseDrawingObject"

export class EllipseObject extends BaseDrawingObject {
  public readonly start: Point
  public readonly end: Point

  constructor(id: string, color: string, width: number, start: Point, end: Point) {
    super(id, "ellipse", color, width)
    this.start = start
    this.end = end
  }

  move(delta: Point): EllipseObject {
    return new EllipseObject(this.id, this.color, this.width, this.start.add(delta), this.end.add(delta))
  }

  clone(): EllipseObject {
    return new EllipseObject(this.id, this.color, this.width, this.start, this.end)
  }

  updateEnd(newEnd: Point): EllipseObject {
    return new EllipseObject(this.id, this.color, this.width, this.start, newEnd)
  }
}

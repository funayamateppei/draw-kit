import {Point} from "../Point"
import {BaseDrawingObject} from "./BaseDrawingObject"

export class FreehandObject extends BaseDrawingObject {
  public readonly points: Point[]

  constructor(id: string, type: "freehand" | "eraser", color: string, width: number, points: Point[]) {
    super(id, type, color, width)
    this.points = points
  }

  move(delta: Point): FreehandObject {
    const newPoints = this.points.map((p) => p.add(delta))
    return new FreehandObject(this.id, this.type as "freehand" | "eraser", this.color, this.width, newPoints)
  }

  clone(): FreehandObject {
    return new FreehandObject(this.id, this.type as "freehand" | "eraser", this.color, this.width, [...this.points])
  }

  addPoint(point: Point): FreehandObject {
    return new FreehandObject(this.id, this.type as "freehand" | "eraser", this.color, this.width, [...this.points, point])
  }
}

import {Point} from "../Point"
import {BaseDrawingObject} from "./BaseDrawingObject"

export class TextObject extends BaseDrawingObject {
  public readonly point: Point
  public readonly text: string
  public readonly fontSize: number

  constructor(id: string, color: string, width: number, point: Point, text: string, fontSize: number = 24) {
    super(id, "text", color, width)
    this.point = point
    this.text = text
    this.fontSize = fontSize
  }

  move(delta: Point): TextObject {
    return new TextObject(this.id, this.color, this.width, this.point.add(delta), this.text, this.fontSize)
  }

  clone(): TextObject {
    return new TextObject(this.id, this.color, this.width, this.point, this.text, this.fontSize)
  }

  updatePosition(newPoint: Point): TextObject {
    return new TextObject(this.id, this.color, this.width, newPoint, this.text, this.fontSize)
  }
}

import {Point} from "../Point"

export type DrawingObjectType = "freehand" | "line" | "ellipse" | "arrow" | "text" | "eraser"

export interface IDrawingObject {
  readonly id: string
  readonly type: DrawingObjectType
  readonly color: string
  readonly width: number

  move(delta: Point): IDrawingObject
  clone(): IDrawingObject
}

export abstract class BaseDrawingObject implements IDrawingObject {
  public readonly id: string
  public readonly type: DrawingObjectType
  public readonly color: string
  public readonly width: number

  constructor(id: string, type: DrawingObjectType, color: string, width: number) {
    this.id = id
    this.type = type
    this.color = color
    this.width = width
  }

  abstract move(delta: Point): IDrawingObject
  abstract clone(): IDrawingObject
}

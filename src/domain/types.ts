export type ToolType = "freehand" | "line" | "ellipse" | "arrow" | "text" | "eraser" | "hand"

export type {DrawingObject} from "./models/drawing-objects"
export type {Point} from "./models/Point"
export type {FreehandObject} from "./models/drawing-objects/FreehandObject"
export type {LineObject} from "./models/drawing-objects/LineObject"
export type {EllipseObject} from "./models/drawing-objects/EllipseObject"
export type {TextObject} from "./models/drawing-objects/TextObject"

export const COLORS = ["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00"]
export const TOOLS: ToolType[] = ["freehand", "line", "ellipse", "arrow", "text", "eraser", "hand"]

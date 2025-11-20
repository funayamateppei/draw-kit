import type {FreehandObject, LineObject, EllipseObject, TextObject, Point} from "../../../domain/types"

export const drawArrowHead = (ctx: CanvasRenderingContext2D, start: Point, end: Point, width: number, color: string) => {
  const angle = Math.atan2(end.y - start.y, end.x - start.x)
  const headLen = width * 3

  ctx.beginPath()
  ctx.moveTo(end.x, end.y)
  ctx.lineTo(end.x - headLen * Math.cos(angle - Math.PI / 6), end.y - headLen * Math.sin(angle - Math.PI / 6))
  ctx.lineTo(end.x - headLen * Math.cos(angle + Math.PI / 6), end.y - headLen * Math.sin(angle + Math.PI / 6))
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
}

export const drawFreehand = (ctx: CanvasRenderingContext2D, obj: FreehandObject) => {
  if (obj.points.length > 0) {
    ctx.beginPath()
    ctx.moveTo(obj.points[0].x, obj.points[0].y)
    for (let i = 1; i < obj.points.length; i++) {
      ctx.lineTo(obj.points[i].x, obj.points[i].y)
    }
    ctx.stroke()
  }
}

export const drawLine = (ctx: CanvasRenderingContext2D, obj: LineObject) => {
  ctx.beginPath()
  ctx.moveTo(obj.start.x, obj.start.y)
  ctx.lineTo(obj.end.x, obj.end.y)
  ctx.stroke()
}

export const drawArrow = (ctx: CanvasRenderingContext2D, obj: LineObject) => {
  drawLine(ctx, obj)
  drawArrowHead(ctx, obj.start, obj.end, obj.width, obj.color)
}

export const drawEllipse = (ctx: CanvasRenderingContext2D, obj: EllipseObject) => {
  const rx = Math.abs(obj.end.x - obj.start.x) / 2
  const ry = Math.abs(obj.end.y - obj.start.y) / 2
  const cx = (obj.start.x + obj.end.x) / 2
  const cy = (obj.start.y + obj.end.y) / 2

  ctx.beginPath()
  ctx.ellipse(cx, cy, rx, ry, 0, 0, 2 * Math.PI)
  ctx.stroke()
}

export const drawText = (ctx: CanvasRenderingContext2D, obj: TextObject) => {
  const fontSize = obj.fontSize || 24
  ctx.font = `${fontSize}px sans-serif`
  ctx.textBaseline = "top"

  const textMetrics = ctx.measureText(obj.text)
  const textWidth = textMetrics.width
  const textHeight = fontSize // Approximation
  const padding = 4

  // Draw background
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
  ctx.fillRect(
    obj.point.x,
    obj.point.y, // Assuming point is top-left
    textWidth + padding * 2,
    textHeight + padding * 2,
  )

  ctx.fillStyle = obj.color
  ctx.fillText(obj.text, obj.point.x + padding, obj.point.y + padding)
}

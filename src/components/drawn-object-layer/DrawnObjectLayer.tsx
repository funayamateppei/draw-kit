import {useEffect, useRef} from "react"
import {useShallow} from "zustand/react/shallow"
import {drawArrow, drawEllipse, drawFreehand, drawLine, drawText} from "../shared/drawing/renderers"
import {DraggableText} from "../shared/drawing/DraggableText"
import {useDrawingStore} from "../../application/store/useDrawingStore"
import {FreehandObject} from "../../domain/models/drawing-objects/FreehandObject"
import {LineObject} from "../../domain/models/drawing-objects/LineObject"
import {EllipseObject} from "../../domain/models/drawing-objects/EllipseObject"
import {TextObject} from "../../domain/models/drawing-objects/TextObject"

interface DrawnObjectLayerProps {
  width: number
  height: number
}

export function DrawnObjectLayer({width, height}: DrawnObjectLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const {drawnObjects, currentObject, selectedTool, updateObject, commitObjectUpdate} = useDrawingStore(
    useShallow((state) => ({
      drawnObjects: state.drawnObjects,
      currentObject: state.currentObject,
      selectedTool: state.selectedTool,
      updateObject: state.updateObject,
      commitObjectUpdate: state.commitObjectUpdate,
    })),
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    const allObjects = currentObject ? [...drawnObjects, currentObject] : drawnObjects

    allObjects.forEach((obj) => {
      ctx.save()

      if (obj.type === "eraser") {
        ctx.globalCompositeOperation = "destination-out"
        ctx.strokeStyle = "rgba(0,0,0,1)"
      } else {
        ctx.globalCompositeOperation = "source-over"
        ctx.strokeStyle = obj.color
        ctx.fillStyle = obj.color
      }

      ctx.lineWidth = obj.width
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      if (obj instanceof FreehandObject) {
        drawFreehand(ctx, obj)
      } else if (obj instanceof LineObject) {
        if (obj.type === "arrow") {
          drawArrow(ctx, obj)
        } else {
          drawLine(ctx, obj)
        }
      } else if (obj instanceof EllipseObject) {
        drawEllipse(ctx, obj)
      } else if (obj instanceof TextObject) {
        drawText(ctx, obj)
      }

      ctx.restore()
    })
  }, [drawnObjects, currentObject, width, height])

  const textObjects = drawnObjects.filter((obj): obj is TextObject => obj instanceof TextObject)

  // Wrapper for onDragEnd to save history
  const handleDragEnd = (oldObj: TextObject, newObj: TextObject) => {
    commitObjectUpdate(oldObj, newObj)
  }

  return (
    <>
      <canvas ref={canvasRef} width={width} height={height} className="absolute inset-0 pointer-events-none z-30" />
      {textObjects.map((obj) => (
        <DraggableText
          key={obj.id}
          object={obj}
          canvasWidth={width}
          canvasHeight={height}
          onUpdate={updateObject}
          onDragEnd={handleDragEnd}
          isOverlay
          isDraggable={selectedTool === "hand"}
        />
      ))}
    </>
  )
}

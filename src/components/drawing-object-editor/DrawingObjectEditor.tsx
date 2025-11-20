import {useState, useRef} from "react"
import {useShallow} from "zustand/react/shallow"
import {useDrawingStore} from "../../application/store/useDrawingStore"
import {Point} from "../../domain/models/Point"
import {FreehandObject} from "../../domain/models/drawing-objects/FreehandObject"
import {LineObject} from "../../domain/models/drawing-objects/LineObject"
import {EllipseObject} from "../../domain/models/drawing-objects/EllipseObject"
import {TextObject} from "../../domain/models/drawing-objects/TextObject"
import type {DrawingObject} from "../../domain/types"

interface DrawingObjectEditorProps {
  width: number
  height: number
}

export function DrawingObjectEditor({width, height}: DrawingObjectEditorProps) {
  const {selectedTool, selectedColor, lineWidth, setCurrentObject, addObject} = useDrawingStore(
    useShallow((state) => ({
      selectedTool: state.selectedTool,
      selectedColor: state.selectedColor,
      lineWidth: state.lineWidth,
      setCurrentObject: state.setCurrentObject,
      addObject: state.addObject,
    })),
  )

  const [isDrawing, setIsDrawing] = useState(false)

  const getPoint = (e: React.MouseEvent): Point => {
    const rect = e.currentTarget.getBoundingClientRect()
    return new Point(e.clientX - rect.left, e.clientY - rect.top)
  }

  // Re-implementing handleMouseMove with state/ref for points
  // We need a ref to store the current object being built so we can update it.
  const currentObjectRef = useRef<DrawingObject | null>(null)

  const handleMouseMoveReal = (e: React.MouseEvent) => {
    if (!isDrawing) return
    const point = getPoint(e)

    if (currentObjectRef.current) {
      let updatedObject: DrawingObject | null = null

      if (currentObjectRef.current instanceof FreehandObject) {
        updatedObject = currentObjectRef.current.addPoint(point)
      } else if (currentObjectRef.current instanceof LineObject) {
        updatedObject = currentObjectRef.current.updateEnd(point)
      } else if (currentObjectRef.current instanceof EllipseObject) {
        updatedObject = currentObjectRef.current.updateEnd(point)
      }

      if (updatedObject) {
        currentObjectRef.current = updatedObject
        setCurrentObject(updatedObject)
      }
    }
  }

  const handleMouseDownReal = (e: React.MouseEvent) => {
    const point = getPoint(e)
    setIsDrawing(true)
    const id = crypto.randomUUID()

    if (selectedTool === "text") {
      const text = prompt("Enter text:")
      if (text) {
        const textObject = new TextObject(
          id,
          selectedColor,
          0, // Text doesn't use line width usually, or maybe for stroke?
          point,
          text,
          lineWidth * 4,
        )
        addObject(textObject)
      }
      setIsDrawing(false)
      return
    }

    let newObject: DrawingObject | null = null

    if (selectedTool === "freehand" || selectedTool === "eraser") {
      newObject = new FreehandObject(id, selectedTool, selectedColor, lineWidth, [point])
    } else if (selectedTool === "line" || selectedTool === "arrow") {
      newObject = new LineObject(id, selectedTool, selectedColor, lineWidth, point, point)
    } else if (selectedTool === "ellipse") {
      newObject = new EllipseObject(id, selectedColor, lineWidth, point, point)
    }

    if (newObject) {
      currentObjectRef.current = newObject
      setCurrentObject(newObject)
    }
  }

  const handleMouseUp = () => {
    if (isDrawing && currentObjectRef.current) {
      addObject(currentObjectRef.current)
      currentObjectRef.current = null
      setCurrentObject(null)
    }
    setIsDrawing(false)
  }

  return (
    <div
      className={`absolute inset-0 z-50 ${selectedTool === "hand" ? "pointer-events-none" : "cursor-crosshair"}`}
      style={{width, height}}
      onMouseDown={handleMouseDownReal}
      onMouseMove={handleMouseMoveReal}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  )
}

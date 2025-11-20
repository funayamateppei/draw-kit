import {useState, useRef, useEffect} from "react"
import {Point} from "../../../domain/models/Point"
import type {TextObject} from "../../../domain/types"

interface DraggableTextProps {
  object: TextObject
  canvasWidth: number
  canvasHeight: number
  onUpdate: (updatedObject: TextObject) => void
  onDragEnd?: (oldObject: TextObject, newObject: TextObject) => void
  isOverlay?: boolean
  isDraggable?: boolean
}

export function DraggableText({
  object,
  canvasWidth,
  canvasHeight,
  onUpdate,
  onDragEnd,
  isOverlay,
  isDraggable,
}: DraggableTextProps) {
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef<{x: number; y: number} | null>(null)
  const objectStartRef = useRef<{x: number; y: number} | null>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isDraggable) return
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    dragStartRef.current = {x: e.clientX, y: e.clientY}
    objectStartRef.current = {x: object.point.x, y: object.point.y}
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !dragStartRef.current || !objectStartRef.current) return

      const dx = e.clientX - dragStartRef.current.x
      const dy = e.clientY - dragStartRef.current.y

      let newX = objectStartRef.current.x + dx
      let newY = objectStartRef.current.y + dy

      const elementWidth = textRef.current?.offsetWidth || 0
      const elementHeight = textRef.current?.offsetHeight || 0

      // Boundary checks
      newX = Math.max(0, Math.min(newX, canvasWidth - elementWidth))
      newY = Math.max(0, Math.min(newY, canvasHeight - elementHeight))

      onUpdate(object.updatePosition(new Point(newX, newY)))
    }

    const handleMouseUp = () => {
      if (isDragging && objectStartRef.current) {
        const oldPoint = new Point(objectStartRef.current.x, objectStartRef.current.y)
        const oldObject = object.updatePosition(oldPoint)
        onDragEnd?.(oldObject, object)
      }
      setIsDragging(false)
      dragStartRef.current = null
      objectStartRef.current = null
    }

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, canvasWidth, canvasHeight, object, onUpdate, onDragEnd])

  const fontSize = object.fontSize || 24
  const padding = 4

  return (
    <div
      ref={textRef}
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        left: object.point.x,
        top: object.point.y,
        fontSize: fontSize,
        color: object.color,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: `${padding}px`,
        cursor: isDraggable ? (isDragging ? "grabbing" : "grab") : "default",
        userSelect: "none",
        whiteSpace: "nowrap",
        fontFamily: "sans-serif",
        lineHeight: 1,
        pointerEvents: isDraggable ? "auto" : "none",
        opacity: isOverlay ? 0 : 1,
        zIndex: 40,
      }}
    >
      {object.text}
    </div>
  )
}

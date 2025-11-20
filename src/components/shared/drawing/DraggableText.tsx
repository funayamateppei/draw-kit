import {useState, useRef, useEffect} from "react"
import {Point} from "../../../domain/models/Point"
import type {TextObject} from "../../../domain/types"

interface DraggableTextProps {
  object: TextObject
  canvasWidth: number
  canvasHeight: number
  onUpdate: (updatedObject: TextObject) => void
  onDragEnd?: () => void
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

      // Boundary checks (simple approximation, assuming text width/height)
      // Since we don't know exact text metrics here easily without canvas context,
      // we'll just keep the top-left point within bounds for now.
      // A better approach would be to measure text.
      newX = Math.max(0, Math.min(newX, canvasWidth))
      newY = Math.max(0, Math.min(newY, canvasHeight))

      onUpdate(object.updatePosition(new Point(newX, newY)))
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      dragStartRef.current = null
      objectStartRef.current = null
      onDragEnd?.()
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

import {create} from "zustand"
import type {DrawingObject, ToolType} from "../../domain/types"

interface DrawingState {
  // State
  drawnObjects: DrawingObject[]
  history: DrawingObject[][]
  historyIndex: number
  currentObject: DrawingObject | null
  selectedColor: string
  selectedTool: ToolType
  lineWidth: number
  backgroundImage: string | null
  canvasSize: {width: number; height: number}

  // Actions
  setDrawnObjects: (objects: DrawingObject[]) => void
  setCurrentObject: (object: DrawingObject | null) => void
  setSelectedColor: (color: string) => void
  setSelectedTool: (tool: ToolType) => void
  setLineWidth: (width: number) => void
  setBackgroundImage: (image: string | null) => void
  setCanvasSize: (size: {width: number; height: number}) => void

  // Domain Logic
  addObject: (object: DrawingObject) => void
  updateObject: (updatedObject: DrawingObject) => void
  addToHistory: (objects: DrawingObject[]) => void
  undo: () => void
  redo: () => void
  reset: () => void
}

export const useDrawingStore = create<DrawingState>((set, get) => ({
  // Initial State
  drawnObjects: [],
  history: [[]],
  historyIndex: 0,
  currentObject: null,
  selectedColor: "#000000",
  selectedTool: "freehand",
  lineWidth: 5,
  backgroundImage: null,
  canvasSize: {width: 800, height: 600},

  // Basic Setters
  setDrawnObjects: (objects) => set({drawnObjects: objects}),
  setCurrentObject: (object) => set({currentObject: object}),
  setSelectedColor: (color) => set({selectedColor: color}),
  setSelectedTool: (tool) => set({selectedTool: tool}),
  setLineWidth: (width) => set({lineWidth: width}),
  setBackgroundImage: (image) => set({backgroundImage: image}),
  setCanvasSize: (size) => set({canvasSize: size}),

  // Complex Actions
  addObject: (object) => {
    const {drawnObjects, addToHistory} = get()
    const newObjects = [...drawnObjects, object]
    set({drawnObjects: newObjects, currentObject: null})
    addToHistory(newObjects)
  },

  updateObject: (updatedObject) => {
    const {drawnObjects} = get()
    const newObjects = drawnObjects.map((obj) => (obj.id === updatedObject.id ? updatedObject : obj))
    set({drawnObjects: newObjects})
  },

  addToHistory: (objects) => {
    const {history, historyIndex} = get()
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(objects)
    set({
      history: newHistory,
      historyIndex: newHistory.length - 1,
    })
  },

  undo: () => {
    const {history, historyIndex} = get()
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      const previousObjects = history[newIndex]
      set({
        historyIndex: newIndex,
        drawnObjects: previousObjects,
      })
    }
  },

  redo: () => {
    const {history, historyIndex} = get()
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      const nextObjects = history[newIndex]
      set({
        historyIndex: newIndex,
        drawnObjects: nextObjects,
      })
    }
  },

  reset: () => {
    set({
      drawnObjects: [],
      history: [[]],
      historyIndex: 0,
    })
  },
}))

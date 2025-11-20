import {create} from "zustand"
import type {DrawingObject, ToolType} from "../../domain/types"
import {CommandManager} from "../commands/CommandManager"
import {AddObjectCommand} from "../../domain/commands/AddObjectCommand"
import {UpdateObjectCommand} from "../../domain/commands/UpdateObjectCommand"

const commandManager = new CommandManager()

interface DrawingState {
  // State
  drawnObjects: DrawingObject[]
  currentObject: DrawingObject | null
  selectedColor: string
  selectedTool: ToolType
  lineWidth: number
  backgroundImage: string | null
  canvasSize: {width: number; height: number}

  // History State
  canUndo: boolean
  canRedo: boolean
  // Deprecated but kept for compatibility during migration if needed,
  // but we will update components to use canUndo/canRedo directly.
  // history: DrawingObject[][];
  // historyIndex: number;

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
  commitObjectUpdate: (oldObject: DrawingObject, newObject: DrawingObject) => void
  undo: () => void
  redo: () => void
  reset: () => void
}

export const useDrawingStore = create<DrawingState>((set) => ({
  // Initial State
  drawnObjects: [],
  currentObject: null,
  selectedColor: "#000000",
  selectedTool: "freehand",
  lineWidth: 5,
  backgroundImage: null,
  canvasSize: {width: 800, height: 600},
  canUndo: false,
  canRedo: false,

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
    const command = new AddObjectCommand(
      object,
      (obj) => set((state) => ({drawnObjects: [...state.drawnObjects, obj]})),
      (id) => set((state) => ({drawnObjects: state.drawnObjects.filter((o) => o.id !== id)})),
    )
    commandManager.execute(command)
    set({
      currentObject: null,
      canUndo: commandManager.canUndo(),
      canRedo: commandManager.canRedo(),
    })
  },

  updateObject: (updatedObject) => {
    set((state) => ({
      drawnObjects: state.drawnObjects.map((obj) => (obj.id === updatedObject.id ? updatedObject : obj)),
    }))
  },

  commitObjectUpdate: (oldObject, newObject) => {
    const command = new UpdateObjectCommand(oldObject, newObject, (obj) =>
      set((state) => ({
        drawnObjects: state.drawnObjects.map((o) => (o.id === obj.id ? obj : o)),
      })),
    )
    commandManager.execute(command)
    set({
      canUndo: commandManager.canUndo(),
      canRedo: commandManager.canRedo(),
    })
  },

  undo: () => {
    commandManager.undo()
    set({
      canUndo: commandManager.canUndo(),
      canRedo: commandManager.canRedo(),
    })
  },

  redo: () => {
    commandManager.redo()
    set({
      canUndo: commandManager.canUndo(),
      canRedo: commandManager.canRedo(),
    })
  },

  reset: () => {
    commandManager.reset()
    set({
      drawnObjects: [],
      canUndo: false,
      canRedo: false,
    })
  },
}))

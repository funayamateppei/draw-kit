import {Undo, Redo} from "@mui/icons-material"
import {useDrawingStore} from "../../application/store/useDrawingStore"
import {useShallow} from "zustand/react/shallow"
import {ImageUploader} from "./ImageUploader"
import {LineWidthSelector} from "./LineWidthSelector"
import {ColorSelector} from "./ColorSelector"
import {ToolTypeSelector} from "./ToolTypeSelector"
import {COLORS, TOOLS} from "../../domain/types"

interface FloatingToolbarProps {
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function FloatingToolbar({onImageUpload}: FloatingToolbarProps) {
  const {undo, redo, canUndo, canRedo} = useDrawingStore(
    useShallow((state) => ({
      undo: state.undo,
      redo: state.redo,
      canUndo: state.canUndo,
      canRedo: state.canRedo,
    })),
  )

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50" onClick={(e) => e.stopPropagation()}>
      <div className="flex w-full justify-between gap-3" onClick={(e) => e.stopPropagation()}>
        {/* Undo/Redo Bar */}
        <div
          className="flex gap-1 p-2 rounded-xl shadow-2xl bg-gray-200/30 backdrop-blur-md"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              undo()
            }}
            disabled={!canUndo}
            title="Undo"
            className={`p-2 rounded-full transition-colors flex items-center justify-center ${
              canUndo ? "hover:bg-gray-300 text-gray-700" : "text-gray-400 cursor-not-allowed"
            }`}
          >
            <Undo fontSize="small" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              redo()
            }}
            disabled={!canRedo}
            title="Redo"
            className={`p-2 rounded-full transition-colors flex items-center justify-center ${
              canRedo ? "hover:bg-gray-300 text-gray-700" : "text-gray-400 cursor-not-allowed"
            }`}
          >
            <Redo fontSize="small" />
          </button>
        </div>
        {/* File Uploader Bar */}
        <div className="p-2 rounded-xl shadow-2xl bg-gray-200/30 backdrop-blur-md" onClick={(e) => e.stopPropagation()}>
          <ImageUploader onUpload={onImageUpload} />
        </div>
      </div>

      {/* Tools Bar */}
      <div
        className="flex flex-col gap-2 p-3 rounded-xl shadow-2xl bg-gray-200/30 backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Line Width */}
        <LineWidthSelector />

        <div className="h-px bg-gray-300" />

        {/* Colors */}
        <ColorSelector colors={COLORS} />

        <div className="h-px bg-gray-300" />

        {/* Tools */}
        <ToolTypeSelector tools={TOOLS} />
      </div>
    </div>
  )
}

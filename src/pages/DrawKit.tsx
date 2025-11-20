import {useShallow} from "zustand/react/shallow"
import {useDrawKit} from "../hooks/useDrawKit"
import {useDrawingStore} from "../application/store/useDrawingStore"
import {DrawingObjectEditor, DrawnObjectLayer, FloatingToolbar} from "../components"

export default function DrawKit() {
  const {canvasSize, backgroundImage} = useDrawingStore(
    useShallow((state) => ({
      canvasSize: state.canvasSize,
      backgroundImage: state.backgroundImage,
    })),
  )

  const {containerRef, handleImageUpload} = useDrawKit()

  return (
    <div className="flex flex-col h-screen bg-gray-200 relative">
      {/* Floating Toolbar */}
      <FloatingToolbar onImageUpload={handleImageUpload} />

      {/* Canvas Area */}
      <div ref={containerRef} className="flex-1 overflow-auto relative flex items-center justify-center p-8">
        <div
          className="relative bg-white shadow-lg"
          style={{
            width: canvasSize.width,
            height: canvasSize.height,
          }}
        >
          {backgroundImage && (
            <img
              src={backgroundImage}
              alt="Background"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
            />
          )}

          <DrawnObjectLayer width={canvasSize.width} height={canvasSize.height} />
          <DrawingObjectEditor width={canvasSize.width} height={canvasSize.height} />
        </div>
      </div>
    </div>
  )
}

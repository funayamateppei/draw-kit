import {useDrawingStore} from "../../application/store/useDrawingStore"

export function LineWidthSelector() {
  const lineWidth = useDrawingStore((state) => state.lineWidth)
  const setLineWidth = useDrawingStore((state) => state.setLineWidth)

  return (
    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      <input
        type="range"
        min="1"
        max="20"
        value={lineWidth}
        onChange={(e) => {
          e.stopPropagation()
          setLineWidth(Number(e.target.value))
        }}
        className="w-32"
      />
      <span className="text-xs text-gray-700 w-4">{lineWidth}</span>
    </div>
  )
}

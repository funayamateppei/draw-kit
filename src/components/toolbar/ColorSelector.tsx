import {useDrawingStore} from "../../application/store/useDrawingStore"

interface ColorSelectorProps {
  colors: string[]
}

export function ColorSelector({colors}: ColorSelectorProps) {
  const selectedColor = useDrawingStore((state) => state.selectedColor)
  const setSelectedColor = useDrawingStore((state) => state.setSelectedColor)

  return (
    <div className="flex flex-row justify-around" onClick={(e) => e.stopPropagation()}>
      {colors.map((color) => (
        <button
          key={color}
          className={`w-8 h-8 rounded-full transition-all ${
            selectedColor === color
              ? "ring-2 ring-white ring-offset-2 ring-offset-gray-800 scale-110"
              : "border-2 border-gray-600 hover:scale-105"
          }`}
          style={{backgroundColor: color}}
          onClick={(e) => {
            e.stopPropagation()
            setSelectedColor(color)
          }}
        />
      ))}
    </div>
  )
}

import {useRef} from "react"
import {useDrawingStore} from "../application/store/useDrawingStore"

export function useDrawKit() {
  const containerRef = useRef<HTMLDivElement>(null)

  const setCanvasSize = useDrawingStore((state) => state.setCanvasSize)
  const setBackgroundImage = useDrawingStore((state) => state.setBackgroundImage)
  const reset = useDrawingStore((state) => state.reset)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          if (containerRef.current) {
            const containerWidth = containerRef.current.clientWidth - 40
            const containerHeight = containerRef.current.clientHeight - 40

            const imgRatio = img.width / img.height
            const containerRatio = containerWidth / containerHeight

            let newWidth, newHeight

            if (imgRatio > containerRatio) {
              newWidth = containerWidth
              newHeight = containerWidth / imgRatio
            } else {
              newHeight = containerHeight
              newWidth = containerHeight * imgRatio
            }

            setCanvasSize({width: newWidth, height: newHeight})
            reset()
          }
          setBackgroundImage(e.target?.result as string)
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  return {
    containerRef,
    handleImageUpload,
  }
}

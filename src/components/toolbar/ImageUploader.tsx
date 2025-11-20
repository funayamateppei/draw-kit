import {useRef} from "react"
import {UploadFile} from "@mui/icons-material"

interface ImageUploaderProps {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function ImageUploader({onUpload}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <input type="file" accept="image/*" onChange={onUpload} className="hidden" ref={fileInputRef} />
      <button
        onClick={(e) => {
          e.stopPropagation()
          fileInputRef.current?.click()
        }}
        title="Upload Image"
        className="p-2 rounded-full hover:bg-gray-300 text-gray-700 transition-colors flex items-center justify-center"
      >
        <UploadFile fontSize="small" />
      </button>
    </>
  )
}

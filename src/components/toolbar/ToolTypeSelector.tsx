import {
  Create,
  ShowChart,
  RadioButtonUnchecked,
  ArrowRightAlt,
  TextFields,
  CleaningServices,
  PanTool,
} from "@mui/icons-material"
import type {ToolType} from "../../domain/types"
import {useDrawingStore} from "../../application/store/useDrawingStore"

interface ToolTypeSelectorProps {
  tools: ToolType[]
}

const TOOL_ICONS: Record<ToolType, React.ReactNode> = {
  freehand: <Create fontSize="small" />,
  line: <ShowChart fontSize="small" />,
  ellipse: <RadioButtonUnchecked fontSize="small" />,
  arrow: <ArrowRightAlt fontSize="small" />,
  text: <TextFields fontSize="small" />,
  eraser: <CleaningServices fontSize="small" />,
  hand: <PanTool fontSize="small" className="-ml-1" />,
}

export function ToolTypeSelector({ tools }: ToolTypeSelectorProps) {
  const selectedTool = useDrawingStore((state) => state.selectedTool);
  const setSelectedTool = useDrawingStore((state) => state.setSelectedTool);

  return (
    <div className="flex flex-row gap-1" onClick={(e) => e.stopPropagation()}>
      {tools.map((tool) => (
        <button
          key={tool}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedTool(tool);
          }}
          title={tool.charAt(0).toUpperCase() + tool.slice(1)}
          className={`p-2 rounded-full transition-colors flex items-center justify-center ${
            selectedTool === tool
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 hover:bg-gray-300'
          }`}
        >
          {TOOL_ICONS[tool]}
        </button>
      ))}
    </div>
  );
}

import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import DrawKit from "./pages"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DrawKit />
  </StrictMode>,
)

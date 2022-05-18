import { createRoot } from "react-dom/client"

function App() {
  return <div>App</div>
}

const el = document.getElementById("container")

if (el === null) throw new Error("Missing container element.")

const root = createRoot(el)
root.render(<App />)

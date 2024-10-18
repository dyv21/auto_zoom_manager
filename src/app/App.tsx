import './App.css'
import {useState} from "react";
import {ZoomControl} from "../common/components/ZoomControl";

function App() {
  const [currentZoom, setCurrentZoom] = useState<number>(100);
  setCurrentZoom(110)

  return (
    <div className="app">
      <h1>Zoom Manager</h1>
      <p>Current Zoom <b>{currentZoom}%</b></p>
      <ZoomControl currentZoom={currentZoom} onZoomChange={setCurrentZoom} />
      <div>QuickZoom buttons</div>
      <div> ScreenSizeZoomSettings</div>
    </div>
  )
}

export default App

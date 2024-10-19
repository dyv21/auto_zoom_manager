import './App.css'
import {useState} from "react";
import {ZoomControl} from "../common/components/ZoomControl";
import {QuickZoom} from "../common/components/QuickZoom";

function App() {
  const [currentZoom, setCurrentZoom] = useState<number>(100);

  return (
    <div className="app">
      <h1>Auto Zoom Manager</h1>
      <p>Current Zoom <b>{currentZoom}%</b></p>
      <ZoomControl currentZoom={currentZoom} onZoomChange={setCurrentZoom} />
      <QuickZoom onQuickZoom={setCurrentZoom} />
      <div> ScreenSizeZoomSettings</div>
    </div>
  )
}

export default App

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
      <div>
        <button onClick={()=> setCurrentZoom(100)}>100%</button>
        <button onClick={()=> setCurrentZoom(115)}>115%</button>
        <button onClick={()=> setCurrentZoom(125)}>125%</button>
      </div>
      <div> ScreenSizeZoomSettings</div>
    </div>
  )
}

export default App

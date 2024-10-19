import './App.css'
import {useState} from "react";
import {ZoomControl} from "../common/components/ZoomControl";
import {QuickZoom} from "../common/components/QuickZoom";
import {ScreenSizeZoomSettings} from "../common/components/ScreenSizeZoomSettings/ScreenSizeZoomSettings.tsx";

export type ScreenSizeZoom  = {
  size: string;
  zoom: number;
}


function App() {
  const [currentZoom, setCurrentZoom] = useState<number>(100);
  const [screenSizeZooms, setScreenSizeZooms] = useState<ScreenSizeZoom[]>([
    { size: 'Small (< 1366px)', zoom: 90 },
    { size: 'Medium (1366px - 1920px)', zoom: 100 },
    { size: 'Large (1921px - 2560px)', zoom: 115 },
    { size: 'Extra Large (> 2560px)', zoom: 125 },
  ]);


  const handleScreenSizeZoomChange = (index: number, newZoom: number) => {
    const updatedZooms = screenSizeZooms.map((item, i) =>
      i === index ? { ...item, zoom: newZoom } : item
    );
    setScreenSizeZooms(updatedZooms);
    chrome.storage.sync.set({ screenSizeZooms: updatedZooms });
  };


  return (
    <div className="app">
      <h1>Auto Zoom Manager</h1>
      <p>Current Zoom <b>{currentZoom}%</b></p>
      <ZoomControl currentZoom={currentZoom} onZoomChange={setCurrentZoom} />
      <QuickZoom onQuickZoom={setCurrentZoom} />
      <div> <ScreenSizeZoomSettings screenSizeZooms={screenSizeZooms} onScreenSizeZoomChange={handleScreenSizeZoomChange} /></div>
    </div>
  )
}

export default App

import './App.css'
import {useEffect, useState} from "react";
import {ZoomControl, QuickZoom, ScreenSizeZoomSettings} from "../common/components";

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

  useEffect(() => {
    const fetchInitialData = async () => {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab?.url) {
        const zoom = await chrome.tabs.getZoom(tab.id!);
        setCurrentZoom(Math.round(zoom * 100));
      }

      chrome.storage.sync.get(['screenSizeZooms'], (data) => {
        if (data.screenSizeZooms) {
          setScreenSizeZooms(data.screenSizeZooms);
        }
      });
    };
    fetchInitialData();
  }, []);

  const handleZoomChange = async (newZoom: number) => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) {
      await chrome.tabs.setZoom(tab.id, newZoom / 100);
      setCurrentZoom(newZoom);
    }
  };


  const quickZoom = (zoomLevel: number) => {
    handleZoomChange(zoomLevel);
  };

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
      <ZoomControl currentZoom={currentZoom} onZoomChange={quickZoom} />
      <QuickZoom onQuickZoom={quickZoom} />
      <ScreenSizeZoomSettings screenSizeZooms={screenSizeZooms} onScreenSizeZoomChange={handleScreenSizeZoomChange} />
    </div>
  )
}

export default App

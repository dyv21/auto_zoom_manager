import React, {useState} from "react";
import {ScreenSizeZoom} from "../../../app/App.tsx";

export const ScreenSizeZoomSettings: React.FC<{ screenSizeZooms: ScreenSizeZoom[], onScreenSizeZoomChange: (index: number, newZoom: number) => void }> = ({ screenSizeZooms, onScreenSizeZoomChange }) => {
  const [isCollapsed, setCollapsed] = useState(true);

  const toggleScreenSizeSettings = () => {
    setCollapsed(!isCollapsed);
  }

  return (
    <div className="screen-size-zooms">
      <p onClick={toggleScreenSizeSettings} className="collapsible-header">
        Screen Size Zoom Settings
        <span className="collapse-icon">{isCollapsed ? '▼' : '▲'}</span>
      </p>

     <div className="screen-size-zoom-item-wrapper">
       {!isCollapsed && screenSizeZooms.map((item, index) => (
         <div key={index} className="screen-size-zoom-item">
           <span>{item.size}</span>
           <input
             type="number"
             min="50"
             max="200"
             value={item.zoom}
             onChange={(e) => onScreenSizeZoomChange(index, Number(e.target.value))}
           />
         </div>
       ))}
     </div>
    </div>
  );
};
import React from "react";
import {ScreenSizeZoom} from "../../../app/App.tsx";

export const ScreenSizeZoomSettings: React.FC<{ screenSizeZooms: ScreenSizeZoom[], onScreenSizeZoomChange: (index: number, newZoom: number) => void }> = ({ screenSizeZooms, onScreenSizeZoomChange }) => {
  return (
    <div className="screen-size-zooms">
      <h2>Screen Size Zoom Settings</h2>
      {screenSizeZooms.map((item, index) => (
        <div key={index} className="screen-size-zoom-item">
          <span>{item.size}</span>
          <input
            type="number"
            min="50"
            max="200"
            value={item.zoom}
            onChange={(e) => onScreenSizeZoomChange(index, Number(e.target.value))}
          />
          <span>%</span>
        </div>
      ))}
    </div>
  );
};
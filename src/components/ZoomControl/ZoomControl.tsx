import React from "react";

type ZoomControlProps = {
  currentZoom: number;
  onZoomChange: (zoom: number) => void;
}

export const ZoomControl: React.FC<ZoomControlProps> = ({currentZoom, onZoomChange}) => {
  return (
    <div className="zoom-control">
      <input
        type="range"
        min="50"
        max="200"
        value={currentZoom}
        onChange={(e) => onZoomChange(Number(e.target.value))}
      />
      <span>{currentZoom}%</span>
    </div>
  );
};

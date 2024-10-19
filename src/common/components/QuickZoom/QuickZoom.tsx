import React from "react";


export const QuickZoom: React.FC<{ onQuickZoom: (zoom: number) => void }> = ({ onQuickZoom }) => {
  return (
    <div className="quick-zoom">
      <button onClick={() => onQuickZoom(100)}>100%</button>
      <button onClick={() => onQuickZoom(115)}>115%</button>
      <button onClick={() => onQuickZoom(125)}>125%</button>
    </div>
  );
};
import React, { useLayoutEffect, useRef, useState } from "react";

interface Position {
  top: number;
  left: number;
}
interface TooltipProps {
  targetRef: React.RefObject<HTMLDivElement>;
  text: string;
}
const Tooltip: React.FC<TooltipProps> = ({ targetRef, text }) => {
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const target = targetRef.current;
    const tooltip = tooltipRef.current;

    if (target && tooltip) {
      const targetRect = target.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      let top = targetRect.bottom + 10;
      let left = targetRect.left + targetRect.width / 5;

      const viewportHeight = window.innerHeight;
      if (top + tooltipRect.height > viewportHeight) {
        top = targetRect.top - tooltipRect.height; 
      }

      setPosition({ top, left });
    }
  }, [targetRef]);

  return (
    <div
      className="tooltip-container"
      ref={tooltipRef}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <p className="tooltip">{text}</p>
    </div>
  );
};

export default Tooltip;

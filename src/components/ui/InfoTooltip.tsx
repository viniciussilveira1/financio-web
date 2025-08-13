import React from "react";

type Position = "top" | "bottom" | "left" | "right";

type InfoToolTipProps = {
  size?: number; // tamanho do círculo em px
  message: string; // texto do tooltip
  position?: Position; // posição do tooltip
};

export default function InfoToolTip({
  size = 20,
  message,
  position = "bottom",
}: InfoToolTipProps) {
  const circleStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: "50%",
    backgroundColor: "#555",
    color: "#fff",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    cursor: "default",
    position: "relative",
    fontSize: size * 0.7,
    userSelect: "none",
  };

  // Estilos para cada posição do tooltip
  const tooltipBaseStyle: React.CSSProperties = {
    visibility: "hidden",
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    borderRadius: 6,
    padding: "6px 10px",
    position: "absolute",
    zIndex: 1,
    whiteSpace: "nowrap",
    fontSize: 12,
    opacity: 0,
    transition: "opacity 0.3s",
  };

  const tooltipPositionStyles: Record<Position, React.CSSProperties> = {
    top: {
      bottom: "120%",
      left: "50%",
      transform: "translateX(-50%) translateY(-2px)",
    },
    bottom: {
      top: "120%",
      left: "50%",
      transform: "translateX(-50%) translateY(2px)",
    },
    left: {
      right: "120%",
      top: "50%",
      transform: "translateX(-2px) translateY(-50%)",
    },
    right: {
      left: "120%",
      top: "50%",
      transform: "translateX(2px) translateY(-50%)",
    },
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-block",
  };

  const showTooltip = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const tooltip = e.currentTarget.querySelector<HTMLDivElement>(".tooltip");
    if (tooltip) {
      tooltip.style.visibility = "visible";
      tooltip.style.opacity = "1";
    }
  };

  const hideTooltip = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const tooltip = e.currentTarget.querySelector<HTMLDivElement>(".tooltip");
    if (tooltip) {
      tooltip.style.visibility = "hidden";
      tooltip.style.opacity = "0";
    }
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      aria-label={message}
    >
      <div style={circleStyle}>?</div>
      <div
        className='tooltip'
        style={{ ...tooltipBaseStyle, ...tooltipPositionStyles[position] }}
      >
        {message}
      </div>
    </div>
  );
}

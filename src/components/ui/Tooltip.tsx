import { type ReactNode, useState } from "react";

interface TooltipProps {
  label: string;
  children: ReactNode;
}

export default function Tooltip({ label, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className='relative inline-block group'
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <span
        className={`
          absolute z-20 left-1/2 -translate-x-1/2 bottom-full mb-2
          px-3 py-1.5 bg-gray-900 text-white text-sm rounded-md shadow-xl 
          whitespace-nowrap transition-all duration-200 
          ${
            visible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        {label}
        <span
          className='absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45'
          style={{ zIndex: -1 }}
        />
      </span>
    </span>
  );
}

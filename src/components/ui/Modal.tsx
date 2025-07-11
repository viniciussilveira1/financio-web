import type { ReactNode } from "react";
import IconButton from "./IconButton";

interface ModalProps {
  children: ReactNode;
  title: string;
  trigger: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export default function Modal({
  children,
  title,
  trigger,
  size = "md",
  isOpen,
  openModal,
  closeModal,
}: ModalProps) {
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <>
      <div onClick={openModal}>{trigger}</div>

      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div
            className='absolute inset-0 bg-opacity-50 backdrop-blur-sm'
            onClick={closeModal}
          />

          <div
            className={`relative bg-white rounded-lg shadow-xl ${sizeClasses[size]} w-full mx-4 max-h-[90vh] overflow-y-auto`}
          >
            <div className='flex items-center justify-between p-6 border-b border-gray-200'>
              <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>

              <IconButton onClick={closeModal} />
            </div>

            <div className='p-4'>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}

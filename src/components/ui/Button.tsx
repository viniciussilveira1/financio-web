import { PiSpinner } from "react-icons/pi";

export default function Button({
  onClick,
  children,
  isLoading,
  type,
  variant = "primary",
  disabled,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "outline";
  disabled?: boolean;
}) {
  return (
    <button
      className={`flex items-center gap-2 ${
        variant === "primary"
          ? "bg-primary text-white"
          : "bg-white text-primary border border-primary "
      } px-4 py-2 rounded-lg`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? <PiSpinner size={16} /> : children}
    </button>
  );
}

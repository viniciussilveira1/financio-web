export default function Button({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`
        w-full
        bg-gradient-to-r from-blue-500 to-blue-900
        text-white
        rounded-lg
        shadow-md
        font-semibold
        hover:from-blue-600 hover:to-blue-800
        hover:shadow-lg
        ${className}
      `}
    >
      {children}
    </button>
  );
}

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
        bg-gradient-to-r from-primary to-primary-dark
        text-white
        rounded-lg
        shadow-md
        font-semibold
        hover:from-primary-dark hover:to-primary
        hover:shadow-lg
        transition-all
        duration-200
        ${className}
      `}
    >
      {children}
    </button>
  );
}

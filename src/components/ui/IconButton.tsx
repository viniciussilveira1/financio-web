import { FiX } from "react-icons/fi";

export default function IconButton({
  onClick,
  icon,
}: {
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  const content = icon || <FiX size={16} />;

  return (
    <button
      onClick={onClick}
      className='flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg'
    >
      {content}
    </button>
  );
}

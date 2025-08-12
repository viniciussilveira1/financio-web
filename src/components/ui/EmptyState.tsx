export function EmptyState({
  message = "Nenhum item encontrado",
}: {
  message?: string;
}) {
  return (
    <div className='flex flex-col items-center justify-center py-12 px-4 text-center text-gray-500'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='w-32 h-32 mb-6 text-gray-300'
        fill='none'
        viewBox='0 0 64 64'
        stroke='currentColor'
        strokeWidth={2}
      >
        <rect
          x='8'
          y='16'
          width='48'
          height='32'
          rx='4'
          ry='4'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <line x1='8' y1='16' x2='56' y2='48' strokeLinecap='round' />
        <line x1='56' y1='16' x2='8' y2='48' strokeLinecap='round' />
      </svg>

      <p className='text-lg font-light'>{message}</p>
    </div>
  );
}

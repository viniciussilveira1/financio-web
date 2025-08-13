export function EmptyState({
  message = "Nenhum item encontrado",
}: {
  message?: string;
}) {
  return (
    <div className='flex flex-col items-center justify-center py-12 px-4 text-center text-gray-500'>
      <p className='text-lg font-light'>{message}</p>
    </div>
  );
}

interface Movement {
  id: number;
  description: string;
  date: string;
  amount: number;
  currency: string;
}

export default function MovementList({
  movements,
  isLoading,
}: {
  movements: Movement[];
  isLoading: boolean;
}) {
  console.log(movements);
  return (
    <ul className='divide-y divide-secondary-100'>
      {isLoading ? (
        <div className='p-4 text-center text-secondary-500'>
          Carregando movimentos...
        </div>
      ) : (
        movements.map((movement) => (
          <li key={movement.id} className='p-4 flex flex-col'>
            <span className='font-medium'>{movement.description}</span>
            <span className='text-sm text-secondary-500'>
              {movement.date} - {movement.amount} {movement.currency}
            </span>
          </li>
        ))
      )}
    </ul>
  );
}

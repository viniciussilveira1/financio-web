import { formatCurrency, formatDate } from "@utils/formatters";

export interface Movement {
  id: number;
  amount: string;
  type: "DESPESA" | "RECEITA";
  category: string;
  description: string;
  date: string;
  walletId: number;
  createdAt: string;
  updatedAt: string;
}

const categoryIcons: Record<string, string> = {
  LAZER: "🎮",
  ALIMENTACAO: "🍔",
  TRANSPORTE: "🚌",
  SAUDE: "💊",
  MORADIA: "🏠",
  EDUCACAO: "📚",
  OUTROS: "💼",
};

export default function MovementList({
  movements,
  isLoading,
}: {
  movements: Movement[];
  isLoading: boolean;
}) {
  return (
    <ul className='divide-y divide-secondary-100'>
      {isLoading ? (
        <div className='p-4 text-center text-secondary-500'>
          Carregando movimentos...
        </div>
      ) : (
        movements.map((movement) => {
          const icon = categoryIcons[movement.category] || "💼";

          return (
            <li key={movement.id} className='p-4 flex flex-col'>
              <span className='font-medium flex items-center gap-2'>
                <span>{icon}</span>
                <span>{movement.description}</span>
              </span>
              <span className='text-sm text-secondary-500'>
                {formatDate(movement.date)} - {formatCurrency(movement.amount)}
              </span>
            </li>
          );
        })
      )}
    </ul>
  );
}

import { formatCurrency, formatDate } from "@utils/formatters";
import Line from "./Line";
import CreateMovement from "@components/Movements/CreateMovement";
import { MovementType } from "@interfaces/Movements";
import Tooltip from "./Tooltip";

export interface Movement {
  id: number;
  amount: string;
  type: MovementType;
  category: string;
  description: string;
  date: string;
  walletId: number;
  createdAt: string;
  updatedAt: string;
}

const categoryLabels: Record<string, string> = {
  SALARIO: "Salário",
  INVESTIMENTOS: "Investimentos",
  ALIMENTACAO: "Alimentação",
  TRANSPORTE: "Transporte",
  LAZER: "Lazer",
  SAUDE: "Saúde",
  MORADIA: "Moradia",
  EDUCACAO: "Educação",
  OUTROS: "Outros",
};

const categoryIcons: Record<string, string> = {
  SALARIO: "💰",
  INVESTIMENTOS: "📈",
  ALIMENTACAO: "🍔",
  TRANSPORTE: "🚌",
  LAZER: "🎮",
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
    <>
      <div className='flex justify-end items-center mb-4'>
        <CreateMovement />
      </div>
      <Line />
      <div className='bg-card rounded-xl shadow-md border border-secondary-200 mt-6'>
        <ul className='divide-y divide-secondary-100'>
          {isLoading ? (
            <div className='p-6 text-center text-secondary-500 text-lg'>
              Carregando movimentos...
            </div>
          ) : movements.length === 0 ? (
            <div className='p-6 text-center text-secondary-400 text-base'>
              Nenhum movimento encontrado.
            </div>
          ) : (
            movements.map((movement) => {
              const icon =
                categoryIcons[movement.category] || categoryIcons.OUTROS;

              return (
                <li
                  key={movement.id}
                  className='p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 hover:bg-secondary-50 transition-colors rounded-lg'
                >
                  <div className='flex items-center gap-4 flex-1 min-w-0'>
                    <Tooltip label={categoryLabels[movement.category]}>
                      <span className='text-2xl cursor-pointer'>{icon}</span>
                    </Tooltip>
                    <div className='flex flex-col min-w-0'>
                      <div className='flex items-center gap-2'>
                        <span
                          className={`font-bold text-lg ${
                            movement.type === MovementType.DESPESA
                              ? "text-red-500"
                              : "text-green-600"
                          }`}
                        >
                          {movement.type === MovementType.DESPESA
                            ? " - "
                            : " + "}
                          {formatCurrency(movement.amount)}
                        </span>
                      </div>

                      <span className='font-medium text-base truncate text-secondary-900'>
                        {formatDate(movement.date)} - {movement.description}
                      </span>
                    </div>
                  </div>

                  <div className='hidden sm:flex flex-col items-end min-w-[160px] ml-4'>
                    <span className='text-[14px] text-secondary-300'>
                      Criado: {formatDate(movement.createdAt)}
                    </span>
                    <span className='text-[14px] text-secondary-300'>
                      Atualizado: {formatDate(movement.updatedAt)}
                    </span>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </>
  );
}

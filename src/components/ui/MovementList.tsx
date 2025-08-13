import { formatCurrency, formatDate } from "@utils/formatters";
import CreateMovement from "@components/Movements/CreateMovement";
import { MovementType, type MovementResponse } from "@interfaces/Movements";
import Tooltip from "./Tooltip";
import IconButton from "./IconButton";
import { PiPencil, PiTrash } from "react-icons/pi";
import InfoTooltip from "./InfoTooltip";

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
  walletId,
}: {
  movements: MovementResponse[];
  isLoading: boolean;
  walletId: number;
}) {
  return (
    <section className='bg-white rounded-2xl shadow-md border border-gray-200 p-6 mt-6'>
      <div className='flex justify-between items-center mb-5'>
        <h3 className='text-xl font-semibold text-gray-800'>Movimentações</h3>
        <CreateMovement walletId={walletId} />
      </div>

      {isLoading ? (
        <p className='text-center text-gray-500 py-10 text-lg'>
          Carregando movimentos...
        </p>
      ) : movements.length === 0 ? (
        <p className='text-center text-gray-400 py-10 text-base'>
          Nenhum movimento encontrado.
        </p>
      ) : (
        <ul className='divide-y divide-gray-100'>
          {movements.map((movement) => {
            const icon =
              categoryIcons[movement.category] || categoryIcons.OUTROS;
            const isExpense = movement.type === MovementType.DESPESA;

            return (
              <li
                key={movement.id}
                className='py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-gray-50 transition rounded-lg px-3'
              >
                <div className='flex items-center gap-4 flex-1 min-w-0'>
                  <Tooltip label={categoryLabels[movement.category]}>
                    <span className='text-3xl'>{icon}</span>
                  </Tooltip>
                  <div className='flex flex-col min-w-0'>
                    <span
                      className={`font-bold text-lg break-words ${
                        isExpense ? "text-red-600" : "text-green-700"
                      }`}
                    >
                      {isExpense ? "-" : "+"} {formatCurrency(movement.amount)}{" "}
                      <InfoTooltip
                        criado={formatDate(movement.createdAt)}
                        atualizado={formatDate(movement.updatedAt)}
                      />
                    </span>
                    <span className='text-sm text-gray-700 truncate max-w-full sm:max-w-[300px]'>
                      {formatDate(movement.date)} - {movement.description}
                    </span>
                  </div>
                </div>

                <div className='flex flex-col sm:items-end min-w-[160px] text-gray-400 text-xs space-y-1'></div>
                <IconButton
                  onClick={() => {
                    console.log("editar movimento");
                  }}
                  icon={<PiPencil />}
                />
                <IconButton
                  onClick={() => {
                    console.log("deletar movimento");
                  }}
                  icon={<PiTrash />}
                />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

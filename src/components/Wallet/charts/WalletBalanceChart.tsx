import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { formatCurrency } from "@utils/formatters";
import { EmptyState } from "@components/ui/EmptyState";

interface Movement {
  date: string;
  amount: string;
}

export default function WalletBalanceChart({
  currentBalance,
  movements,
  isLoading,
}: {
  currentBalance: number;
  movements: Movement[];
  isLoading: boolean;
}) {
  const chartData = movements.map((m) => ({
    date: format(new Date(m.date), "dd/MM"),
    value: Number(m.amount),
  }));

  if (movements.length == 0) {
    return (
      <section className='md:col-span-2 bg-white rounded-2xl shadow-md border border-gray-200 p-6'>
        <EmptyState message='Nenhum movimento encontrado' />
      </section>
    );
  }

  return (
    <section className='col-span-full lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-200 p-4 sm:p-6'>
      <h2 className='text-lg font-semibold text-green-600 mb-3'>
        Saldo da Carteira
      </h2>
      <div className='p-6'>
        <p className='text-2xl font-bold mb-4 text-app'>
          {formatCurrency(currentBalance)}
        </p>

        <div className='h-80'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={isLoading ? [] : chartData}>
              <XAxis dataKey='date' stroke='#64748b' />
              <YAxis stroke='#64748b' />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  color: "#1e293b",
                }}
              />
              <Line
                type='monotone'
                dataKey='value'
                stroke='#22c55e'
                strokeWidth={3}
                dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

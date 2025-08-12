import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useMemo } from "react";
import { formatCurrency } from "@utils/formatters";
import {
  MovementCategory,
  MovementCategoryFriendly,
} from "@interfaces/Movements";

interface Movement {
  category: string;
  amount: string;
}

interface WalletDonutChartProps {
  movements?: Movement[];
  totalBalance?: string;
  currency?: string;
  assetCount?: number;
  isLoading: boolean;
}

const COLORS = [
  "#22c55e",
  "#16a34a",
  "#4ade80",
  "#15803d",
  "#a3e635",
  "#84cc16",
  "#65a30d",
  "#4d7c0f",
];

export default function WalletDonutChart({
  movements = [],
  isLoading,
}: WalletDonutChartProps) {
  const data = useMemo(() => {
    if (isLoading || movements.length === 0) return [];

    const map = new Map<string, number>();

    for (const mov of movements) {
      const value = Number(mov.amount);
      if (map.has(mov.category)) {
        map.set(mov.category, map.get(mov.category)! + value);
      } else {
        map.set(mov.category, value);
      }
    }

    return Array.from(map.entries()).map(([category, value], index) => ({
      name: category,
      value,
      color: COLORS[index % COLORS.length],
    }));
  }, [movements, isLoading]);

  return (
    <section className='bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col justify-center'>
      <h2 className='text-lg font-semibold text-green-600 mb-3 text-center'>
        Minha Carteira
      </h2>
      <div className='p-6'>
        <p className='text-center text-primary text-2xl font-bold mb-4'>
          {movements.length} Ativos
        </p>

        <ResponsiveContainer width='100%' height={250}>
          <PieChart>
            <Pie
              data={isLoading ? [] : data}
              innerRadius={60}
              outerRadius={80}
              dataKey='value'
              stroke='none'
              label={({ name, percent }) =>
                `${MovementCategoryFriendly[name as MovementCategory]}: ${(
                  (percent ?? 0) * 100
                ).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className='mt-4'>
          {data.map((item, index) => (
            <div
              key={index}
              className='flex justify-between text-sm mb-1 text-app'
            >
              <span className='flex items-center gap-2'>
                <span
                  className='w-3 h-3 rounded-full'
                  style={{ backgroundColor: item.color }}
                />
                {MovementCategoryFriendly[item.name as MovementCategory]}
              </span>
              <span className='font-bold text-primary'>
                {formatCurrency(item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

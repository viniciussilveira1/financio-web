// components/WalletDonutChart.tsx
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Bitcoin (BTC)", value: 24, color: "#22c55e" },
  { name: "Ethereum (ETH)", value: 18, color: "#16a34a" },
  { name: "Shard (SHARD)", value: 32, color: "#4ade80" },
  { name: "Binance (BNB)", value: 22, color: "#15803d" },
];

export default function WalletDonutChart() {
  return (
    <div className='p-6'>
      <h2 className='text-center text-lg font-semibold mb-2 text-app'>
        My Wallet
      </h2>
      <p className='text-center text-primary text-2xl font-bold mb-4'>
        € 12,433.35
      </p>
      <p className='text-center text-sm text-secondary-500 mb-4'>12 Assets</p>

      <ResponsiveContainer width='100%' height={250}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            dataKey='value'
            stroke='none'
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
              {item.name}
            </span>
            <span className='font-bold text-primary'>{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

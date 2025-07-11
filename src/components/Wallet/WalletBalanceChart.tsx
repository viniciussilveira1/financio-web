import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "05/05", value: 500 },
  { date: "13/05", value: 4500 },
  { date: "20/05", value: 3500 },
  { date: "28/05", value: 5500 },
  { date: "05/06", value: 3000 },
];

export default function WalletBalanceChart({
  isLoading,
}: {
  isLoading: boolean;
}) {
  return (
    <div className='p-6'>
      <h2 className='text-primary text-xl mb-2 font-semibold'>
        Wallet Balance
      </h2>
      <p className='text-2xl font-bold mb-4 text-app'>3,433.35 EUR</p>

      <div className='h-80'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={isLoading ? [] : data}>
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
  );
}

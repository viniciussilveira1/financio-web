import WalletBalanceChart from "@components/WalletBalanceChart";
import WalletDonutChart from "@components/WalletDonutChart";

export default function WalletsPage() {
  return (
    <div className='p-6 space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='md:col-span-2 bg-card rounded-xl shadow-sm border border-secondary-200'>
          <WalletBalanceChart />
        </div>

        <div className='bg-card rounded-xl shadow-sm border border-secondary-200 flex flex-col justify-between'>
          <WalletDonutChart />
        </div>
      </div>
    </div>
  );
}

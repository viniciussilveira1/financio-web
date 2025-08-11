import { useQuery } from "@tanstack/react-query";
import { getWalletsList, getMovementsByWalletId } from "@services/api.routes";
import { useEffect, useState } from "react";

import MovementList from "@components/ui/MovementList";
import DropDown from "@components/ui/DropDown";
import CreateWallet from "@components/Wallet/modals/CreateWallet";
import WalletBalanceChart from "@components/Wallet/charts/WalletBalanceChart";
import WalletDonutChart from "@components/Wallet/charts/WalletDonutChart";

export default function WalletsPage() {
  const [selectedWalletId, setSelectedWalletId] = useState<number | null>(null);

  const { data: wallets, isLoading: isWalletsLoading } = useQuery({
    queryKey: ["wallets"],
    queryFn: getWalletsList,
  });

  const { data: movements, isLoading: isMovementsLoading } = useQuery({
    queryKey: ["movements", selectedWalletId],
    queryFn: () => getMovementsByWalletId(selectedWalletId!),
    enabled: !!selectedWalletId,
  });

  useEffect(() => {
    if (wallets?.length) {
      setSelectedWalletId(wallets[0].id);
    }
  }, [wallets]);

  return (
    <div className='p-6 mx-auto '>
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
        <DropDown
          items={wallets || []}
          selectedId={selectedWalletId}
          setSelectedId={setSelectedWalletId}
        />
        <CreateWallet />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <section className='md:col-span-2 bg-white rounded-2xl shadow-md border border-gray-200 p-6'>
          <h2 className='text-lg font-semibold text-green-600 mb-3'>
            Wallet Balance
          </h2>
          <WalletBalanceChart isLoading={isWalletsLoading} />
        </section>

        <section className='bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col justify-center'>
          <h2 className='text-lg font-semibold text-green-600 mb-3 text-center'>
            My Wallet
          </h2>
          <WalletDonutChart isLoading={isWalletsLoading} />
        </section>
      </div>

      <MovementList
        walletId={selectedWalletId || 0}
        movements={movements?.items || []}
        isLoading={isMovementsLoading}
      />
    </div>
  );
}

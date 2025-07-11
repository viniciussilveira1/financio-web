import WalletBalanceChart from "@components/Wallet/charts/WalletBalanceChart";
import WalletDonutChart from "@components/Wallet/charts/WalletDonutChart";
import { useQuery } from "@tanstack/react-query";
import { getWalletsList } from "@services/api.routes";
import { useState } from "react";
import { getMovementsByWalletId } from "@services/api.routes";
import MovementList from "@components/ui/MovementList";
import DropDown from "@components/ui/DropDown";
import CreateWallet from "@components/Wallet/modals/CreateWallet";

export default function WalletsPage() {
  const [selectedWalletId, setSelectedWalletId] = useState<number>(0);

  const {
    data: wallets,
    isLoading: isWalletsLoading,
    refetch: refetchWallets,
  } = useQuery({
    queryKey: ["wallets"],
    queryFn: () => getWalletsList(),
  });

  const { data: movements, isLoading: isMovementsLoading } = useQuery({
    queryKey: ["movements", selectedWalletId],
    queryFn: () => getMovementsByWalletId(selectedWalletId!),
    enabled: !!selectedWalletId,
  });

  const handleWalletCreated = () => {
    refetchWallets();
  };

  return (
    <div className='p-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <DropDown
          items={wallets || []}
          selectedId={selectedWalletId}
          onChange={setSelectedWalletId}
        />

        <div className='flex gap-2'>
          <CreateWallet onWalletCreated={handleWalletCreated} />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='md:col-span-2 bg-card rounded-xl shadow-sm border border-secondary-200'>
          <WalletBalanceChart isLoading={isWalletsLoading} />
        </div>

        <div className='bg-card rounded-xl shadow-sm border border-secondary-200 flex flex-col justify-between'>
          <WalletDonutChart isLoading={isWalletsLoading} />
        </div>
      </div>

      <div className='bg-card rounded-xl shadow-sm border border-secondary-200 mt-6'>
        <MovementList
          movements={movements?.items || []}
          isLoading={isMovementsLoading}
        />
      </div>
    </div>
  );
}

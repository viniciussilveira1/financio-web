import { useQuery } from "@tanstack/react-query";
import { getWalletsList } from "@services/api.routes";
import { useEffect, useState } from "react";
import { getMovementsByWalletId } from "@services/api.routes";
import MovementList from "@components/ui/MovementList";
import DropDown from "@components/ui/DropDown";
import CreateWallet from "@components/Wallet/modals/CreateWallet";
import WalletBalanceChart from "@components/Wallet/charts/WalletBalanceChart";
import WalletDonutChart from "@components/Wallet/charts/WalletDonutChart";
import Line from "@components/ui/Line";

export default function WalletsPage() {
  const [selectedWalletId, setSelectedWalletId] = useState<number | null>(null);

  const { data: wallets, isLoading: isWalletsLoading } = useQuery({
    queryKey: ["wallets"],
    queryFn: () => getWalletsList(),
  });

  const { data: movements, isLoading: isMovementsLoading } = useQuery({
    queryKey: ["movements", selectedWalletId],
    queryFn: () => getMovementsByWalletId(selectedWalletId!),
    enabled: !!selectedWalletId,
  });

  useEffect(() => {
    setSelectedWalletId(wallets?.[0]?.id || null);
  }, [wallets]);

  return (
    <div className='p-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <DropDown
          items={wallets || []}
          selectedId={selectedWalletId}
          setSelectedId={setSelectedWalletId}
        />
        <CreateWallet />
      </div>
      <Line />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='md:col-span-2 bg-card rounded-xl shadow-sm border border-secondary-200'>
          <WalletBalanceChart isLoading={isWalletsLoading} />
        </div>

        <div className='bg-card rounded-xl shadow-sm border border-secondary-200 flex flex-col justify-between'>
          <WalletDonutChart isLoading={isWalletsLoading} />
        </div>
      </div>

      <MovementList
        movements={movements?.items || []}
        isLoading={isMovementsLoading}
      />
    </div>
  );
}

import WalletBalanceChart from "@components/Wallet/WalletBalanceChart";
import WalletDonutChart from "@components/Wallet/WalletDonutChart";
import { useQuery } from "@tanstack/react-query";
import { getWalletsList } from "@services/api.routes";
import { useEffect, useState } from "react";
import { getMovementsByWalletId } from "@services/api.routes";
import MovementList from "@components/ui/MovementList";
import DropDown from "@components/ui/DropDown";

export default function WalletsPage() {
  const [selectedWalletId, setSelectedWalletId] = useState<number | null>(null);

  const {
    data: wallets,
    isLoading: isWalletsLoading,
    isSuccess: isWalletsSuccess,
  } = useQuery({
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
  }, [isWalletsSuccess, wallets]);

  return (
    <div className='p-6 space-y-6'>
      <DropDown
        items={wallets || []}
        selectedId={selectedWalletId}
        setSelectedId={setSelectedWalletId}
      />

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

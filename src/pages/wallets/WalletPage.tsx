import { useQuery } from "@tanstack/react-query";
import { getWalletsList, getMovementsByWalletId } from "@services/api.routes";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import MovementList from "@components/ui/MovementList";
import DropDown from "@components/ui/DropDown";
import CreateWallet from "@components/Wallet/modals/CreateWallet";
import WalletBalanceChart from "@components/Wallet/charts/WalletBalanceChart";
import WalletDonutChart from "@components/Wallet/charts/WalletDonutChart";
import WalletsPageSkeleton from "@components/Skeletons/WalletsPageSkeleton";

export default function WalletsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const walletIdFromUrl = searchParams.get("walletId");
  const parsedWalletId = walletIdFromUrl ? Number(walletIdFromUrl) : null;

  const [selectedWalletId, setSelectedWalletId] = useState<number | null>(
    parsedWalletId
  );

  const [activeChart, setActiveChart] = useState(0);

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
    if (selectedWalletId !== null) {
      setSearchParams({ walletId: selectedWalletId.toString() });
    }
  }, [selectedWalletId, setSearchParams]);

  useEffect(() => {
    if (wallets?.length) {
      const walletExists = wallets.some((w) => w.id === selectedWalletId);
      if (!walletExists) {
        const firstWalletId = wallets[0].id;
        setSelectedWalletId(firstWalletId);
        setSearchParams({ walletId: firstWalletId.toString() });
      }
    }
  }, [wallets, selectedWalletId, setSearchParams]);

  if (isWalletsLoading) {
    return <WalletsPageSkeleton />;
  }

  const charts = [
    <WalletBalanceChart
      key='balance'
      currentBalance={movements?.currentBalance || 0}
      movements={movements?.items || []}
      isLoading={isMovementsLoading}
    />,
    <WalletDonutChart
      key='donut'
      isLoading={isMovementsLoading}
      movements={movements?.items || []}
    />,
  ];

  return (
    <div className='p-4 lg:p-6 mx-auto'>
      <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-6'>
        <DropDown
          items={wallets || []}
          selectedId={selectedWalletId}
          setSelectedId={setSelectedWalletId}
        />
        <CreateWallet />
      </div>

      <div className='hidden lg:grid grid-cols-3 gap-6 mb-6'>{charts}</div>

      <div className='lg:hidden relative w-full mb-6'>
        {charts[activeChart]}
        <button
          onClick={() => setActiveChart((prev) => (prev === 0 ? 1 : 0))}
          className='absolute top-1/2 right-3 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-50 transition'
        >
          ➡
        </button>
        <button
          onClick={() => setActiveChart((prev) => (prev === 0 ? 1 : 0))}
          className='absolute top-1/2 left-3 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-50 transition'
        >
          ⬅
        </button>
      </div>

      <MovementList
        walletId={selectedWalletId || 0}
        movements={movements?.items || []}
        isLoading={isMovementsLoading}
      />
    </div>
  );
}

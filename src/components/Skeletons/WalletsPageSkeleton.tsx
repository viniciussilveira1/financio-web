export default function WalletsPageSkeleton() {
  return (
    <div className='p-6 mx-auto animate-pulse space-y-6'>
      {/* Top controls */}
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
        <div className='bg-gray-300 rounded-md h-10 w-48' /> {/* dropdown */}
        <div className='bg-gray-300 rounded-md h-10 w-32' />{" "}
        {/* create wallet button */}
      </div>

      {/* Charts grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* WalletBalanceChart skeleton (md:col-span-2) */}
        <section className='md:col-span-2 bg-white rounded-2xl shadow-md border border-gray-200 p-6'>
          <div className='h-6 w-40 bg-gray-300 rounded mb-4' /> {/* title */}
          <div className='h-10 w-32 bg-gray-300 rounded mb-6' /> {/* balance */}
          <div className='h-80 bg-gray-300 rounded' /> {/* chart placeholder */}
        </section>

        {/* WalletDonutChart skeleton */}
        <section className='bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col justify-center items-center'>
          <div className='h-6 w-36 bg-gray-300 rounded mb-4' /> {/* title */}
          <div className='h-10 w-24 bg-gray-300 rounded mb-4' />{" "}
          {/* totalBalance */}
          <div className='h-4 w-20 bg-gray-300 rounded mb-6' />{" "}
          {/* assetCount */}
          <div className='h-64 w-full bg-gray-300 rounded-full' />{" "}
          {/* donut chart */}
          <div className='mt-4 space-y-2 w-full'>
            {/* legend items */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className='flex justify-between items-center w-full'>
                <div className='h-3 w-3 rounded-full bg-gray-300' />
                <div className='h-4 w-20 bg-gray-300 rounded' />
                <div className='h-4 w-10 bg-gray-300 rounded' />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* MovementList skeleton */}
      <section className='bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-4'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='flex justify-between items-center space-x-4'>
            <div className='h-6 w-24 bg-gray-300 rounded' /> {/* description */}
            <div className='h-6 w-16 bg-gray-300 rounded' /> {/* amount */}
            <div className='h-6 w-20 bg-gray-300 rounded' /> {/* date */}
          </div>
        ))}
      </section>
    </div>
  );
}
